import './search-list.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import extendedRenderCards from '../../../services/extended-search-page/list-render/extended-render.service';

export default class ExtendedSearchList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['extended-search-list'],
    });
    extendedRenderCards.setContainer(this.node);
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
