import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { IFilmData } from '../../../../shared/models/response-data';
import movieValue from '../../../services/movie-page/movie-value.service';
import './movie-rating.scss';

export default class MovieRating {
  private title: DOMElement;

  private content: DOMElement;

  private contentStars: DOMElement;

  private contentRating: DOMElement;

  private contentRatingNum: DOMElement;

  private contentRatingSum: DOMElement;

  private contentRatingIMDB: DOMElement;

  private contentRatingIMDBNum: DOMElement;

  private contentRatingIMDBSum: DOMElement;

  constructor(container: HTMLElement, item: IFilmData) {
    this.title = new DOMElement(container, {
      tagName: 'h3',
      classList: ['movie-rating__title'],
      content: 'Рейтинг фильма',
    });

    this.content = new DOMElement(container, {
      tagName: 'div',
      classList: ['movie-rating__content'],
    });

    this.contentStars = new DOMElement(this.content.node, {
      tagName: 'div',
      classList: ['movie-rating__content_stars'],
    });
    this.contentStars.node.style.setProperty('--rating', `${item.ratingKinopoisk}`);

    this.contentRating = new DOMElement(this.content.node, {
      tagName: 'div',
      classList: ['movie-rating__content_rating'],
    });

    this.contentRatingNum = new DOMElement(this.contentRating.node, {
      tagName: 'div',
      classList: this.getRatingStyle(item),
      content: `${movieValue.getRating(item)}`,
    });

    this.contentRatingSum = new DOMElement(this.contentRating.node, {
      tagName: 'div',
      classList: ['movie-rating__content_sum'],
      content: `${item.ratingKinopoiskVoteCount} ${movieValue.declOfNum(item.ratingKinopoiskVoteCount, [
        'оценка',
        'оценки',
        'оценок',
      ])}`,
    });

    this.contentRatingIMDB = new DOMElement(this.content.node, {
      tagName: 'div',
      classList: ['movie-rating__content_imdb'],
    });

    this.contentRatingIMDBNum = new DOMElement(this.contentRatingIMDB.node, {
      tagName: 'p',
      classList: ['movie-rating__content_imdb-num'],
      content: `IMDb: ${movieValue.getRatingImdb(item)}`,
    });

    this.contentRatingIMDBSum = new DOMElement(this.contentRatingIMDB.node, {
      tagName: 'p',
      classList: ['movie-rating__content_imdb-sum'],
      content: `${item.ratingImdbVoteCount} ${movieValue.declOfNum(item.ratingImdbVoteCount, [
        'оценка',
        'оценки',
        'оценок',
      ])}`,
    });
  }

  private getRatingStyle(data: IFilmData) {
    const rating =
      +data.ratingKinopoisk < 7 ? ['movie-rating__content_num'] : ['movie-rating__content_num', 'positive'];
    return rating;
  }
}
