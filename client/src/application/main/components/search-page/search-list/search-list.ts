import './search-list.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import state from '../../../../shared/services/state';
import SearchListCard from './card/card';

export default class SearchList extends DOMElement {
  private card: SearchListCard;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['search-list'],
    });
    const mock = state.getSearchKeyword().films[0];
    this.card = new SearchListCard(this.node, mock, 1);
  }
}
