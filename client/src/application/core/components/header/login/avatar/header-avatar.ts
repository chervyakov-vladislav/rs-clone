import './header-avatar.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../../shared/components/base-elements/image-element';

export default class HeaderAvatar extends DOMElement {
  private userPhoto: ImageElement;

  constructor(parentNode: HTMLElement, img: File | string) {
    super(parentNode, {
      tagName: 'div',
      classList: ['header-avatar'],
    });

    this.userPhoto = new ImageElement(this.node, {
      tagName: 'img',
      classList: ['header-avatar__image'],
      src: `${img}`,
    });
  }
}
