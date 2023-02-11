import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import apiKinopoisk from '../../../shared/services/api/api-kinopoisk';
import state from '../../../shared/services/state';
import QuerryDescription from '../../components/search-page/querry-description/querry-description';
import headerObserver from '../../../core/services/menu/header-observer.service';
import SearchList from '../../components/search-page/search-list/search-list';

export default class SearchPage extends Page {
  private container: DOMElement;

  private title: QuerryDescription | null = null;

  private list: SearchList | null = null;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['search-result-page__container'],
    });

    this.render();
  }

  private async render() {
    state.setSearchNextPage(1);
    const newState = await apiKinopoisk.searchKeyword(state.getSearchKeywordValue());
    state.setSearchResult(newState);
    headerObserver.closeAll();

    this.title = new QuerryDescription(this.container.node);
    this.list = new SearchList(this.container.node);
  }
}
