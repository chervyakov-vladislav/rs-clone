import './image-modal.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../../shared/components/base-elements/image-element';
import { PostersInfoArray } from '../../../../../shared/models/response-data';

export default class ImageModal extends DOMElement {
  private image: ImageElement;

  constructor(parentNode: HTMLElement, data: PostersInfoArray) {
    super(parentNode, {
      tagName: 'li',
      classList: ['wallpepers-modal-image'],
    });

    this.image = new ImageElement(this.node, {
      tagName: 'img',
      src: data.previewUrl,
      classList: ['wallpepers-modal-image__pic'],
    });
  }
}
