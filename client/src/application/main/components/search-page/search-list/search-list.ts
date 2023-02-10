import './search-list.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import renderCards from '../../../services/search-page/render-cards/render-card.service';
import infiniteScroll from '../../../services/search-page/inifinite-scroll/infinite-scroll.service';
import state from '../../../../shared/services/state';

export default class SearchList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['search-list'],
    });
    renderCards.setContainer(this.node);
    renderCards.render();
    const func = infiniteScroll.scrollListener.bind(infiniteScroll);
    window.addEventListener('scroll', () => {
      const { currentPageID } = state.getPreviousPageInfo();
      if (currentPageID === 'searchPage') func();
    });
    window.addEventListener('resize', () => {
      const { currentPageID } = state.getPreviousPageInfo();
      if (currentPageID === 'searchPage') func();
    });
  }
}
