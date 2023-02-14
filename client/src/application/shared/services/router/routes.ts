import AccountPage from '../../../main/pages/account-page/account-page';
import ExtendedSearchPage from '../../../main/pages/extended-search-page/extended-search';
import MainPage from '../../../main/pages/main-page/main-page';
import MoviePage from '../../../main/pages/movie-page/movie-page';
import PremierePage from '../../../main/pages/premiere-page/premiere-page';
import AuthPage from '../../../main/pages/auth-page/auth-page';
import BestPage from '../../../main/pages/recomend-page/best-page';
import RecomendPage from '../../../main/pages/recomend-page/recomend-page';
import SearchPage from '../../../main/pages/search-page/search-page';

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
  {
    id: 'searchPage',
    template: () => new SearchPage('search-result-page'),
  },
  {
    id: 's',
    template: () => new ExtendedSearchPage('extended-search'),
  },
  {
    id: 'account',
    template: () => new AccountPage('account-page'),
  },
];

export default mainRoutes;
