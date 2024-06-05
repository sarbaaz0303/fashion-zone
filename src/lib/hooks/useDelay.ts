import { useState, useEffect } from 'react';

const useDelay = (delay: number) => {
  const [isDelayed, setIsDelayed] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isDelayed;
};

export default useDelay;
