import './modal.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ControlsModal from './controls/controls';

export default class WallpaperModal extends DOMElement {
  private container: DOMElement;

  private controls: ControlsModal;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['wallpepers-modal'],
    });
    window.addEventListener('hashchange', () => {
      this.node.remove();
    });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['wallpepers-modal__container'],
    });

    this.controls = new ControlsModal(this.container.node);
    this.controls.close.node.addEventListener('click', () => this.node.remove());
  }
}
