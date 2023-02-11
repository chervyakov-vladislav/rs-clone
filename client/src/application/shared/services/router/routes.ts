import MainPage from '../../../main/pages/main-page/main-page';
import MoviePage from '../../../main/pages/movie-page/movie-page';
import PremierePage from '../../../main/pages/premiere-page/premiere-page';
import BestPage from '../../../main/pages/recomend-page/best-page';
import RecomendPage from '../../../main/pages/recomend-page/recomend-page';

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
    id: 'recomend',
    template: () => new RecomendPage('recomend-page'),
  },
  {
    id: 'best',
    template: () => new BestPage('best-page'),
  },
  {
    id: 'movie',
    template: () => new MoviePage('movie-page'),
  },
];

export default mainRoutes;
