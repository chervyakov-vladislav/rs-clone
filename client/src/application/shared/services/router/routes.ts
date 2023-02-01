import MainPage from '../../../main/pages/main-page/main-page';
import SecondPage from '../../../main/pages/second-page/second-page';

export const routes = [
  {
    path: '',
    template: () => new MainPage('main-page'),
  },
  {
    path: 'premiere',
    template: () => new SecondPage('sec-page'),
  },
];
