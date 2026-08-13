import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';

import AppLayout from '@renderer/components/layout/AppLayout';

const Themes = lazy(() => import('@renderer/pages/themes'));
const Workbench = lazy(() => import('@renderer/pages/workbench'));

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
        element: <Workbench />
      },
      {
        path: 'themes',
        element: <Themes />
      }
    ]
  }
]);
