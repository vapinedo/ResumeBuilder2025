import { lazyImport } from '@shared/utils/lazyImport';

const LoginPage = lazyImport(() => import('@feature/auth/pages/LoginPage'));
const PersonasRouter = lazyImport(() => import('@feature/persona/PersonaRouter'));
const DashboardPage = lazyImport(() => import('@feature/dashboard/pages/DashboardPage'));

export interface AppRoute {
  path: string;
  isPrivate?: boolean;
  Component: React.ComponentType;
}

export const appRoutes: AppRoute[] = [
  {
    path: '/login',
    Component: LoginPage,
    isPrivate: false,
  },
  {
    path: '/',
    Component: DashboardPage,
    isPrivate: true,
  },
  {
    path: '/personas/*',
    Component: PersonasRouter,
    isPrivate: true,
  },
];
