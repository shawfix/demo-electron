import { createHashRouter } from 'react-router-dom';

import AppLayout from '@renderer/components/layout/AppLayout';

export const routerPath = {
  index: '/',
  themes: 'themes'
};

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import('@renderer/pages/workbench');
          return { Component };
        }
      },
      {
        path: routerPath.themes,
        lazy: async () => {
          const { default: Component } = await import('@renderer/pages/themes');
          return { Component };
        }
      }
    ]
  }
]);
