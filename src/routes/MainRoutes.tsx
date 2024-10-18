import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';
import { lazy } from 'react';

const NotFoundError = Loadable(lazy(() => import('../pages/error/40X')));
const UnexpectedError = Loadable(lazy(() => import('../pages/error/50X')));

const Verde = Loadable(lazy(() => import('../pages/Verde')));

export default {
  path: '/',
  children: [
    {
      path: '/verde',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Verde />
        },
        {
          path: '*',
          element: <NotFoundError />
        },
        {
          path: 'error',
          element: <UnexpectedError />
        }
      ]
    }
  ]
};
