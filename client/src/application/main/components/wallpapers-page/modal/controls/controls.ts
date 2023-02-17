import './controls.scss';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import SVG from '../../../../../shared/components/svg-icons';

export default class ControlsModal extends DOMElement {
  public close: DOMElement;

  private nav: DOMElement;

  public prevBtn: ButtonElement;

  public counter: DOMElement;

  public nextBtn: ButtonElement;

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

    this.nav = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['wallpepers-controls__navigation'],
    });

    this.prevBtn = new ButtonElement(this.nav.node, {
      tagName: 'button',
      classList: ['wallpepers-controls__prev'],
    });
    this.prevBtn.node.innerHTML = SVG.arrow;

    this.counter = new DOMElement(this.nav.node, {
      tagName: 'div',
      classList: ['wallpepers-controls__counter'],
      content: '1/1',
    });

    this.nextBtn = new ButtonElement(this.nav.node, {
      tagName: 'button',
      classList: ['wallpepers-controls__next'],
    });
    this.nextBtn.node.innerHTML = SVG.arrow;
  }
}
