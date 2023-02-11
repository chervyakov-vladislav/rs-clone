import './movie-page.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import state from '../../../shared/services/state';
import MovieInfo from '../../components/movie-page/movie-info/movie-info';

export default class MoviePage extends Page {
  private movieInfoContainer: DOMElement;

  private movieInfo: MovieInfo | null;

  constructor(id: string) {
    super(id);

    this.movieInfoContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['movie-info'],
    });

    this.movieInfo = null;

    this.render();
  }

  public async render() {
    const { hash } = window.location;
    const movieID = hash.split('/')[1];
    await state.loadMovieData(+movieID);
    await state.loadMovieBuget(+movieID);
    const data = state.allData.movieData;
    const staff = state.allData.movieStaff;
    if (data && staff) {
      this.movieInfo = new MovieInfo(this.movieInfoContainer.node, data, staff);
    }
  }
}
