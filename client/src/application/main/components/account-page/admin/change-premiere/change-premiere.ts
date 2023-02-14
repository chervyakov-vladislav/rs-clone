import './change-premiere.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';

export default class ChangePreviere extends DOMElement {
  private title: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['change-premiere'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Поменять премьеру',
      classList: ['change-premiere__title'],
    });
  }
}
