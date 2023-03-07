import './suggest-card.scss';
import DOMElement from '../../../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../../../shared/components/base-elements/image-element';
import LinkElement from '../../../../../../shared/components/base-elements/link-element';
import { ITopFilm } from '../../../../../../shared/models/response-data';
import headerObserver from '../../../../../services/menu/header-observer.service';
import storage from '../../../../../../shared/components/local-storage';

export default class SuggestCard extends DOMElement {
  private cardLink: LinkElement;

  private linkContainer: DOMElement;

  private image: ImageElement;

  private description: DOMElement;

  private title: DOMElement;

  private descString: DOMElement;

  private rating: DOMElement;

  private info: DOMElement;

  constructor(parentNode: HTMLElement, data: ITopFilm) {
    super(parentNode, {
      tagName: 'li',
      classList: ['suggest-card'],
    });

    this.cardLink = new LinkElement(this.node, {
      tagName: 'a',
      classList: ['suggest-card__link'],
      href: `#movie/${data.filmId}`,
    });
    this.cardLink.node.addEventListener('click', () => {
      headerObserver.closeAll();
      headerObserver.clearInput();
      const movie = { filmId: data.filmId, posterUrlPreview: data.posterUrlPreview, nameRu: data.nameRu };
      storage.putMovies(movie);
    });

    this.linkContainer = new DOMElement(this.cardLink.node, {
      tagName: 'div',
      classList: ['suggest-card__container'],
    });

    this.image = new ImageElement(this.linkContainer.node, {
      tagName: 'img',
      src: data.posterUrlPreview,
      classList: ['suggest-card__image'],
    });

    this.description = new DOMElement(this.linkContainer.node, {
      tagName: 'div',
      classList: ['suggest-card__description'],
    });

    this.title = new DOMElement(this.description.node, {
      tagName: 'h3',
      classList: ['suggest-card__title'],
      content: this.isNameRu(data),
    });

    this.descString = new DOMElement(this.description.node, {
      tagName: 'p',
      classList: ['suggest-card__string'],
    });

    this.rating = new DOMElement(this.descString.node, {
      tagName: 'span',
      classList: this.ratingStyle(data),
      content: this.isRating(data),
    });

    this.info = new DOMElement(this.descString.node, {
      tagName: 'span',
      classList: ['suggest-card__info'],
      content: this.getInfo(data),
    });
  }

  private isNameRu(data: ITopFilm) {
    return data.nameRu ? data.nameRu : '-';
  }

  private ratingStyle(data: ITopFilm) {
    const styleArr = ['suggest-card__rating'];
    if (parseInt(data.rating, 10) > 6.9) styleArr.push('suggest-card__rating--green');
    return styleArr;
  }

  private isRating(data: ITopFilm) {
    return parseInt(data.rating, 10) > 0 ? data.rating : '-';
  }

  private getInfo(data: ITopFilm) {
    const text: string[] = [];
    if (data.nameEn) text.push(data.nameEn);
    if (data.genres) {
      data.genres.forEach((genre, index) => {
        if (index < 2) {
          text.push(genre.genre);
        }
      });
    }
    if (data.year && data.year !== 'null') text.push(data.year);
    return text.length > 0 ? text.join(', ') : '';
  }
}
