import MainPage from '../../../main/pages/main-page/main-page';
import SecondPage from '../../../main/pages/second-page/second-page';

const mainRoutes = [
  {
    id: '',
    template: () => new MainPage('main-page'),
  },
  {
    id: 'premiere',
    template: () => new SecondPage('sec-page'),
  },
];

export default mainRoutes;
