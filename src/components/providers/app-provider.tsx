'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Children } from '@/types';
import { createClient } from '@/lib/supabase/client';

type AppContextProps = {
  state: {
    user: any;
  };
  actions: {
    setUser: (user: any) => void;
  };
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: Children) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const supabase = createClient();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const response = await fetch('/api/get-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: session.user.id,
            }),
          });

          const { data: userProfile, error } = await response.json();

          if (error) {
            console.error(error);
          } else {
            setUser({ ...userProfile });
          }
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    state: { user },
    actions: { setUser },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
