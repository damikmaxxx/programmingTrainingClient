import { 
  PROFILE_ROUTE, 
  PROJECTS_ROUTE, 
  PROJECT_ROUTE, 
  MAP_ROUTE, 
  SHOP_ROUTE, 
  RATING_ROUTE, 
  LOGIN_ROUTE, 
  REGISTRATION_ROUTE 
} from './utils/consts';

import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Map from './pages/Map';
import Shop from './pages/Shop';
import Rating from './pages/Rating';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
    layoutProps: {
      mainClear: true,
    },
  },
  {
    path: `${PROFILE_ROUTE}/test-style/:id`,
    Component: (props) => <Profile {...props} testStyle={true} />,
    layoutProps: {
      mainClear: true,
    },
  },
  {
    path: PROJECTS_ROUTE,
    Component: Projects,
    layoutProps: {
      dark: true,
    },
  },
  {
    path: `${PROJECT_ROUTE}/:id`,
    Component: Project,
    layoutProps: {
      dark: true,
    },
  },
  {
    path: MAP_ROUTE,
    Component: Map,
    layoutProps: {
      noMainWrapper: true,
    },
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
    layoutProps: {
      dark: true,
    },
  },
  {
    path: RATING_ROUTE,
    Component: Rating,
    layoutProps: {
      dark: true,
    },
  },
];

export const publicRoutes = [
  {
    path: '/',
    Component: Home,
    layoutProps: {
      dark: true,
    },
  },
];

// Маршруты, которые показываются только незарегистрированным пользователям
export const guestRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
    layoutProps: {
      dark: true,
    },
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
    layoutProps: {
      dark: true,
    },
  },
];

export const notFoundRoute = [
  {
    path: '*',
    Component: NotFound,
    layoutProps: {
      dark: true,
    },
  },
];
