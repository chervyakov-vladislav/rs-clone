import './movie-info.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { IFilmData, IReviewsData, IStaff } from '../../../../shared/models/response-data';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import SVG from '../../../../shared/components/svg-icons';
import movieValue from '../../../services/movie-page/movie-value.service';

export default class MovieInfo {
  private staff: IStaff[];

  private column1: DOMElement;

  private moviePoster: DOMElement;

  private moviePosterImage: ImageElement;

  private movieTrailer: DOMElement;

  private column2: DOMElement;

  private movieTitle: DOMElement;

  private movieButtons: DOMElement;

  private buttonWatch: ButtonElement;

  private buttonRate: ButtonElement;

  private movieAbout: DOMElement;

  private movieGrid: DOMElement;

  private gridYear1: DOMElement;

  private gridYear2: DOMElement;

  private gridCountry1: DOMElement;

  private gridCountry2: DOMElement;

  private gridGenre1: DOMElement;

  private gridGenre2: DOMElement;

  private gridDirector1: DOMElement;

  private gridDirector2: DOMElement;

  private gridWritter1: DOMElement;

  private gridWritter2: DOMElement;

  private gridProducer1: DOMElement;

  private gridProducer2: DOMElement;

  private gridOperator1: DOMElement;

  private gridOperator2: DOMElement;

  private gridComposer1: DOMElement;

  private gridComposer2: DOMElement;

  private gridEditor1: DOMElement;

  private gridEditor2: DOMElement;

  private gridTime1: DOMElement;

  private gridTime2: DOMElement;

  private column3: DOMElement;

  private gridRating: DOMElement;

  private gridRatingTotal: DOMElement;

  private gridReviewsTotal: DOMElement;

  private movieCast: DOMElement;

  private movieCastTitle: DOMElement;

  constructor(container: HTMLElement, item: IFilmData, staff: IStaff[], reviews: IReviewsData) {
    this.staff = staff;

    this.column1 = new DOMElement(container, {
      tagName: 'div',
      classList: ['movie-info__column1'],
    });

    this.moviePoster = new DOMElement(this.column1.node, {
      tagName: 'div',
      classList: ['movie-info__poster'],
    });

    this.moviePosterImage = new ImageElement(this.moviePoster.node, {
      tagName: 'img',
      classList: ['movie-info__poster_img'],
      src: item.posterUrl as string,
      alt: item.nameRu as string,
    });

    this.movieTrailer = new DOMElement(this.column1.node, {
      tagName: 'div',
      classList: ['movie-info__trailer'],
    });

    this.column2 = new DOMElement(container, {
      tagName: 'div',
      classList: ['movie-info__column2'],
    });

    this.movieTitle = new DOMElement(this.column2.node, {
      tagName: 'h2',
      classList: ['movie-info__title'],
      content: `${item.nameRu} (${item.year})`,
    });

    this.movieButtons = new DOMElement(this.column2.node, {
      tagName: 'div',
      classList: ['movie-info__buttons'],
    });

    this.buttonWatch = new ButtonElement(this.movieButtons.node, {
      tagName: 'button',
      classList: ['movie-info__to-watch-btn'],
    });
    this.buttonWatch.node.innerHTML = SVG.tabBookmark;

    this.buttonRate = new ButtonElement(this.movieButtons.node, {
      tagName: 'button',
      classList: ['movie-info__to-rate-btn'],
    });
    this.buttonRate.node.innerHTML = SVG.starRating;

    this.movieAbout = new DOMElement(this.column2.node, {
      tagName: 'h3',
      classList: ['movie-info__about-title'],
      content: 'О фильме',
    });

    this.movieGrid = new DOMElement(this.column2.node, {
      tagName: 'div',
      classList: ['movie-info__grid'],
    });

    this.gridYear1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Год производства',
    });

    this.gridYear2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: `${item.year}`,
    });

    this.gridCountry1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Страна',
    });

    this.gridCountry2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getCountry(item),
    });

    this.gridGenre1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Жанр',
    });

    this.gridGenre2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getGenres(item),
    });

    this.gridDirector1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Режиссёр',
    });

    this.gridDirector2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'DIRECTOR'),
    });

    this.gridWritter1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Сценарий',
    });

    this.gridWritter2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'WRITER'),
    });

    this.gridProducer1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Продюсер',
    });

    this.gridProducer2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'PRODUCER'),
    });

    this.gridOperator1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Оператор',
    });

    this.gridOperator2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'OPERATOR'),
    });

    this.gridComposer1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Композитор',
    });

    this.gridComposer2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'COMPOSER'),
    });

    this.gridEditor1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Монтаж',
    });

    this.gridEditor2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'EDITOR'),
    });

    this.gridTime1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Время',
    });

    this.gridTime2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getTime(item),
    });

    this.column3 = new DOMElement(container, {
      tagName: 'div',
      classList: ['movie-info__column3'],
    });

    this.gridRating = new DOMElement(this.column3.node, {
      tagName: 'p',
      classList: movieValue.getRatingStyle(item),
      content: `${item.ratingKinopoisk}`,
    });

    this.gridRatingTotal = new DOMElement(this.column3.node, {
      tagName: 'p',
      classList: ['movie-info__ratings-total'],
      content: `${item.ratingKinopoiskVoteCount} ${movieValue.declOfNum(item.ratingKinopoiskVoteCount, [
        'оценка',
        'оценки',
        'оценок',
      ])}`,
    });

    this.gridReviewsTotal = new DOMElement(this.column3.node, {
      tagName: 'p',
      classList: ['movie-info__reviews-total'],
      content: `${reviews.total} ${movieValue.declOfNum(reviews.total, ['рецензия', 'рецензии', 'рецензий'])}`,
    });

    this.movieCast = new DOMElement(this.column3.node, {
      tagName: 'div',
      classList: ['movie-info__cast'],
    });

    this.movieCastTitle = new DOMElement(this.movieCast.node, {
      tagName: 'h4',
      classList: ['movie-info__cast_title'],
      content: 'В главных ролях',
    });

    this.renderActor();
  }

  private renderActor() {
    const container = this.movieCast.node;
    const actors = movieValue.getStaff(this.staff, 'ACTOR').split(', ').slice(0, 13);

    actors.forEach((actor) => {
      return new DOMElement(container, {
        tagName: 'p',
        classList: ['movie-info__actor'],
        content: `${actor}`,
      });
    });
  }
}
