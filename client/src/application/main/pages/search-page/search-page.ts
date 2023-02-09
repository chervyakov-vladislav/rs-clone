import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import apiKinopoisk from '../../../shared/services/api/api-kinopoisk';
import state from '../../../shared/services/state';
import QuerryDescription from '../../components/search-page/querry-description/querry-description';
import headerObserver from '../../../core/services/menu/header-observer.service';

export default class SearchPage extends Page {
  private container: DOMElement;

  private title: QuerryDescription | null = null;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['search-result-page__container'],
    });

    this.render();
  }

  private async render() {
    const newState = await apiKinopoisk.searchKeyword(state.getSearchKeywordValue());
    state.setSearchKeyword(newState);
    headerObserver.closeAll();

    this.title = new QuerryDescription(this.container.node);
  }
}
