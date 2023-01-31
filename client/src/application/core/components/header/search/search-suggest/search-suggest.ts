import './search-suggest.scss';
import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';

export class Suggest extends DOMElement {
  private suggestList: DOMElement;

  private showAllBtn: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['search-suggest'],
    });

    this.suggestList = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['search-suggest__list'],
    });

    this.showAllBtn = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['search-suggest__button'],
      content: 'Показать все',
    });
  }
}
