import './movie-page.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import state from '../../../shared/services/state';
import MovieInfo from '../../components/movie-page/movie-info/movie-info';
import MovieDescription from '../../components/movie-page/movie-description/movie-description';
import MovieRating from '../../components/movie-page/movie-rating/movie-rating';
import MovieContent from '../../components/movie-page/movie-content/movie-content';

export default class MoviePage extends Page {
  private movieInfoContainer: DOMElement;

  private movieDescriptionContainer: DOMElement;

  private movieRatingContainer: DOMElement;

  private movieContentContainer: DOMElement;

  private movieInfo: MovieInfo | null;

  private movieDescription: MovieDescription | null;

  private movieRating: MovieRating | null;

  private movieContent: MovieContent | null;

  constructor(id: string) {
    super(id);

    this.movieInfoContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['movie-info'],
    });

    this.movieDescriptionContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['movie-description'],
    });

    this.movieRatingContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['movie-rating'],
    });

    this.movieContentContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['movie-content'],
    });

    this.movieInfo = null;

    this.movieDescription = null;

    this.movieRating = null;

    this.movieContent = null;

    this.render();
  }

  public async render() {
    const { hash } = window.location;
    const movieID = hash.split('/')[1];
    await state.loadMovieDataStaff(+movieID);
    await state.loadMovieReviews(+movieID);
    const data = state.allData.movieData;
    const staff = state.allData.movieStaff;
    const reviews = state.allData.movieReviews;
    if (data && staff && reviews) {
      this.movieInfo = new MovieInfo(this.movieInfoContainer.node, data, staff, reviews);
      this.movieDescription = new MovieDescription(this.movieDescriptionContainer.node, data);
      this.movieRating = new MovieRating(this.movieRatingContainer.node, data);
      this.movieContent = new MovieContent(this.movieContentContainer.node, data, reviews);
    }
  }
}
