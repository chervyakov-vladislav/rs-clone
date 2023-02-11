import './search-list.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import extendedRenderCards from '../../../services/extended-search-page/list-render/extended-render.service';
// import state from '../../../../shared/services/state';
// import extendedInfiniteScroll from '../../../services/extended-search-page/infinite-scroll/infitine-scroll';

export default class ExtendedSearchList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['extended-search-list'],
    });
    extendedRenderCards.setContainer(this.node);
    // extendedRenderCards.render();
    // const func = extendedInfiniteScroll.scrollListener.bind(extendedInfiniteScroll);
    // window.addEventListener('scroll', () => {
    //   const { currentPageID } = state.getPreviousPageInfo();
    //   if (currentPageID === 's') func();
    // });
    // window.addEventListener('resize', () => {
    //   const { currentPageID } = state.getPreviousPageInfo();
    //   if (currentPageID === 's') func();
    // });
  }
}
