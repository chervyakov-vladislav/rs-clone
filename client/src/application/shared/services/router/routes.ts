import MainPage from '../../../main/pages/main-page/main-page';
import SecondPage from '../../../main/pages/second-page/second-page';
import AuthPage from '../../../main/pages/auth-page/auth-page';

const mainRoutes = [
  {
    id: '',
    template: () => new MainPage('main-page'),
  },
  {
    id: 'premiere',
    template: () => new SecondPage('sec-page'),
  },
  {
    id: 'auth',
    template: () => new AuthPage('auth-page'),
  },
];

export default mainRoutes;
