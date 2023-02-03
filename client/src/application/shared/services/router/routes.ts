import MainPage from '../../../main/pages/main-page/main-page';
import PremierePage from '../../../main/pages/premiere-page/premiere-page';

const mainRoutes = [
  {
    id: '',
    template: () => new MainPage('main-page'),
  },
  {
    id: 'premiere',
    template: () => new PremierePage('premiere-page'),
  },
];

export default mainRoutes;
