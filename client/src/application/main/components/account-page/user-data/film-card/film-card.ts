import './film-card.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../../shared/components/base-elements/image-element';
import { IFilmData } from '../../../../../shared/models/response-data';

export default class LikedFilmCard extends DOMElement {
  private image: ImageElement;

  private title: DOMElement;

  constructor(parentNode: HTMLElement, data: IFilmData) {
    super(parentNode, {
      tagName: 'li',
      classList: ['liked-card'],
    });
    this.node.addEventListener('click', () => {
      window.location.hash = `#movie/${data.kinopoiskId}`;
    });

    this.image = new ImageElement(this.node, {
      tagName: 'img',
      src: data.posterUrlPreview,
      classList: ['liked-card__image'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['liked-card__title'],
      content: this.nameValidation(data),
    });
  }

  private nameValidation(data: IFilmData) {
    const name = data.nameRu === null ? data.nameOriginal : data.nameRu;
    return name === null ? '-' : name;
  }
}
