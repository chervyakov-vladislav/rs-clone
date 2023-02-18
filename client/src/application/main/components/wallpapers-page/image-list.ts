import './image-list.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import wallpepersController from '../../services/wallpeper-page/wallpaper-conroller.service';

export default class ImageList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['wallpepers-image-list'],
    });
    wallpepersController.registerContainer(this.node);
    wallpepersController.renderGrid();
  }
}
