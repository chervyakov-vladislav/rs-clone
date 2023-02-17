import './controls.scss';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import SVG from '../../../../../shared/components/svg-icons';

export default class ControlsModal extends DOMElement {
  public close: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['wallpepers-controls'],
    });

    this.close = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['wallpepers-controls__close'],
    });
    this.close.node.innerHTML = SVG.closeIcon;
  }
}
