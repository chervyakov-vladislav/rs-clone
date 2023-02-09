import './search-list.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import renderCards from '../../../services/search-page/render-cards/render-card.service';

export default class SearchList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['search-list'],
    });
    renderCards.setContainer(this.node);
    renderCards.render();
  }
}
