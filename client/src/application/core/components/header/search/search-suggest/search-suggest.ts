import './search-suggest.scss';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import headerObserver from '../../../../services/header-observer.service';

export default class Suggest extends DOMElement {
  private suggestList: DOMElement;

  private showAllBtn: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['search-suggest'],
    });
    headerObserver.register(this);

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
