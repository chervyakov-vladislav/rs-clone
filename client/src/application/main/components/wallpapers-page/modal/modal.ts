import './modal.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ControlsModal from './controls/controls';
import LinksModal from './link-buttons/link-buttons';

export default class WallpaperModal extends DOMElement {
  private container: DOMElement;

  public controls: ControlsModal;

  public imageContainer: DOMElement;

  public links: LinksModal;

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

    this.imageContainer = new DOMElement(this.container.node, {
      tagName: 'ul',
      classList: ['wallpepers-modal__image-container'],
    });

    this.controls = new ControlsModal(this.container.node);
    this.controls.close.node.addEventListener('click', () => this.node.remove());

    this.links = new LinksModal(this.container.node);
  }
}
