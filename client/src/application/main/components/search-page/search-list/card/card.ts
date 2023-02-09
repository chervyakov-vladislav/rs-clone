import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../../shared/components/base-elements/image-element';
import LinkElement from '../../../../../shared/components/base-elements/link-element';
import { ITopFilm } from '../../../../../shared/models/response-data';

export default class SearchListCard extends DOMElement {
  private link: LinkElement;

  private count: DOMElement;

  private image: ImageElement;

  private info: DOMElement;

  private desc: DOMElement;

  private title: DOMElement;

  private buttons: DOMElement;

  constructor(parentNode: HTMLElement, data: ITopFilm, count: number) {
    super(parentNode, {
      tagName: 'li',
      classList: ['search-card'],
    });
    console.log(data);

    this.link = new LinkElement(this.node, {
      tagName: 'a',
      classList: ['search-card__link'],
      href: `#/movie/${data.filmId}`,
    });

    this.count = new DOMElement(this.link.node, {
      tagName: 'span',
      classList: ['search-card__count'],
      content: count.toString(),
    });

    this.image = new ImageElement(this.link.node, {
      tagName: 'img',
      classList: ['search-card__image'],
      src: data.posterUrlPreview,
    });

    this.info = new DOMElement(this.link.node, {
      tagName: 'div',
      classList: ['search-card__info'],
    });

    this.desc = new DOMElement(this.info.node, {
      tagName: 'div',
      classList: ['search-card__desc'],
    });

    this.title = new DOMElement(this.desc.node, {
      tagName: 'h3',
      classList: ['search-card__film-title'],
      content: this.checkNameRu(data),
    });

    this.buttons = new DOMElement(this.info.node, {
      tagName: 'div',
      classList: ['search-card__buttons'],
    });
  }

  private checkNameRu(data: ITopFilm) {
    const isNameRu = data.nameRu ? data.nameRu : data.nameEn;
    const isName = isNameRu.length > 0 ? isNameRu : '-';
    return isName;
  }
}
