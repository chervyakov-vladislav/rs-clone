import MainPage from '../../../main/pages/main-page/main-page';
import PremierePage from '../../../main/pages/premiere-page/premiere-page';
import AuthPage from '../../../main/pages/auth-page/auth-page';

const mainRoutes = [
  {
    id: '',
    template: () => new MainPage('main-page'),
  },
  {
    id: 'premiere',
    template: () => new PremierePage('premiere-page'),
  },
  {
    id: 'auth',
    template: () => new AuthPage('auth-page'),
  },
];

export default mainRoutes;
