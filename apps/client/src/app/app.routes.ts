import { Route } from '@angular/router';
import { DefaultLayout } from './layout/default.layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: 'category/:categoryId',
        loadComponent: () => import('./pages/category/category.page'),
      },
    ],
  },
];
