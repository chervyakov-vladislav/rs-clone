import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import apiKinopoisk from '../../../shared/services/api/api-kinopoisk';
import state from '../../../shared/services/state';
import ListTitle from '../../components/search-page/list-title/list-title';
import headerObserver from '../../../core/services/menu/header-observer.service';

export default class SearchPage extends Page {
  private container: DOMElement;

  private title: ListTitle | null = null;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['search-page__container'],
    });

    this.render();
  }

  private async render() {
    if (state.getSearchKeyword() === null) {
      const newState = await apiKinopoisk.searchKeyword(state.getSearchKeywordValue());
      state.setSearchKeyword(newState);
      headerObserver.closeAll();
    }
    this.title = new ListTitle(this.container.node);
  }
}
