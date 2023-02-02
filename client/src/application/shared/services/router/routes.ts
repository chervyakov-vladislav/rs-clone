import MainPage from '../../../main/pages/main-page/main-page';
import PremierePage from '../../../main/pages/premiere-page/premiere-page';

const mainRoutes = [
  {
    path: '',
    template: () => new MainPage('main-page'),
  },
  {
    path: 'premiere',
    template: () => new PremierePage('premiere-page'),
  },
];

export default mainRoutes;