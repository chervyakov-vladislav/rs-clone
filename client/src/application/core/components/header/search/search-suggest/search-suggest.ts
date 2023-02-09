import './search-suggest.scss';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import headerObserver from '../../../../services/menu/header-observer.service';
import state from '../../../../../shared/services/state';

export default class Suggest extends DOMElement {
  public suggestList: DOMElement;

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
      content: 'Показать больше',
    });
    this.showAllBtn.node.addEventListener('click', () => {
      const { length } = state.getSearchKeywordValue();
      if (length > 0) {
        headerObserver.closeAll();
        headerObserver.clearInput();
        window.location.hash = '#searchPage';
      }
    });
  }
}
