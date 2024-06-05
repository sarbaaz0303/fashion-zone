import { AppData } from '@/lib/static/app-metadata';

import type { MetadataRoute } from 'next';

const { name, short_name, description } = AppData;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: name,
    short_name: short_name,
    description: description,
    start_url: '/',
    display: 'standalone',
    background_color: '#7A1818',
    theme_color: '#7A1818',
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
