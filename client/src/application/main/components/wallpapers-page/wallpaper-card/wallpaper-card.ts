import './wallpaper-card.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import { PostersInfoArray } from '../../../../shared/models/response-data';

export default class ImageCard extends DOMElement {
  private image: ImageElement;

  constructor(parentNode: HTMLElement, data: PostersInfoArray) {
    super(parentNode, {
      tagName: 'li',
      classList: ['wallpepers-image-card'],
    });

    this.image = new ImageElement(this.node, {
      tagName: 'img',
      classList: ['wallpepers-image-card__img'],
      src: data.previewUrl,
    });
  }
}
