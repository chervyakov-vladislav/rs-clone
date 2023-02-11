import './extended-search.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import TopFilms from '../../components/extended-search/top-films/top-films';
import LastYearFilms from '../../components/extended-search/last-years/last-years';
import ExtendedSearchForm from '../../components/extended-search/search-form/search-form';
import ExtendedSearchList from '../../components/extended-search/search-list/search-list';
import state from '../../../shared/services/state';

export default class ExtendedSearchPage extends Page {
  private container: DOMElement;

  private topFilms: TopFilms;

  private lastYearFilms: LastYearFilms;

  private searchForm: ExtendedSearchForm;

  private list: ExtendedSearchList;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['extended-search__container'],
    });

    state.setSearchNextPage(1);
    this.topFilms = new TopFilms(this.container.node);
    this.lastYearFilms = new LastYearFilms(this.container.node);
    this.searchForm = new ExtendedSearchForm(this.container.node);
    this.list = new ExtendedSearchList(this.container.node);
  }
}
