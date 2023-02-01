import './modal.scss';
import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';

export default class ModalPage extends Page {
  private container: DOMElement;

  private close: ButtonElement;

  public message: DOMElement;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['modal__container'],
    });

    this.close = new ButtonElement(this.container.node, {
      tagName: 'button',
      classList: ['modal__close'],
      content: 'Close',
    });

    this.message = new DOMElement(this.container.node, {
      tagName: 'p',
      classList: ['modal__message'],
    });

    this.node.addEventListener('click', (e: Event) => {
      if (e.target === this.container.node) {
        e.stopPropagation();
      }
      if (e.target === this.node) {
        console.log('need implement removeModal()');
      }
    });
    this.close.node.addEventListener('click', () => console.log('need implement removeModal()'));
  }
}
