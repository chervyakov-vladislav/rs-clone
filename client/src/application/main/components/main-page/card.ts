import DOMElement from '../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../shared/components/base-elements/image-element';
import LinkElement from '../../../shared/components/base-elements/link-element';
import { ITopFilm } from '../../../shared/models/response-data';

export default class MovieCard {
  private movieCard: DOMElement;

  private movieCardLink: LinkElement;

  private movieCardPoster: DOMElement;

  private movieCardPosterImage: ImageElement;

  private movieCardTitle: DOMElement;

  private movieCardInfo: DOMElement;

  private movieCardYear: DOMElement;

  private movieCardGenre: DOMElement;

  constructor(container: HTMLElement, item: ITopFilm) {
    this.movieCard = new DOMElement(container, {
      tagName: 'div',
      classList: ['movie__card'],
      id: `${item.filmId}`,
    });
    this.movieCardLink = new LinkElement(this.movieCard.node, {
      tagName: 'a',
      href: `#/movie/${item.filmId}`,
      classList: ['movie__card_link'],
      content: '',
    });
    this.movieCardPoster = new DOMElement(this.movieCard.node, {
      tagName: 'div',
      classList: ['movie__card_poster'],
    });
    this.movieCardPosterImage = new ImageElement(this.movieCardPoster.node, {
      tagName: 'img',
      classList: ['movie__card_img'],
      src: item.posterUrlPreview,
      alt: item.nameRu,
    });
    this.movieCardTitle = new DOMElement(this.movieCard.node, {
      tagName: 'p',
      classList: ['movie__card_title'],
      content: item.nameRu,
    });
    this.movieCardInfo = new DOMElement(this.movieCard.node, {
      tagName: 'div',
      classList: ['movie__card_info'],
    });
    this.movieCardYear = new DOMElement(this.movieCardInfo.node, {
      tagName: 'p',
      classList: ['movie__card_year'],
      content: item.year,
    });

    this.movieCardGenre = new DOMElement(this.movieCardInfo.node, {
      tagName: 'p',
      classList: ['movie__card_year'],
      content: item.genres[0].genre,
    });
  }
}
