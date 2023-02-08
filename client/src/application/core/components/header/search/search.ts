import './search.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import InputElement from '../../../../shared/components/base-elements/input-element';
import SVG from '../../../../shared/components/svg-icons';
import Suggest from './search-suggest/search-suggest';
import apiHelpers from '../../../../shared/services/api/api-helpers.service';
import searchService from '../../../services/search/search.service';

export default class Search extends DOMElement {
  private input: InputElement;

  private filterButton: ButtonElement;

  private searchButton: ButtonElement;

  private searchSuggest: Suggest | null = null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['search'],
    });
    this.node.addEventListener('input', (e: Event) => {
      let value: string = '';
      apiHelpers.debounce(() => {
        value = (e.target as HTMLInputElement).value;

        if (this.searchSuggest !== null) {
          const { node } = this.searchSuggest as Suggest;
          node.remove();
        }

        if (value.length > 0) searchService.headerSearch(value);
        this.searchSuggest = value.length > 0 ? new Suggest(this.node) : null;
      })();
    });

    this.input = new InputElement(this.node, {
      tagName: 'input',
      classList: ['search__input-text'],
      type: 'search',
      placeholder: 'Фильмы, сериалы, персоны',
    });

    this.filterButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['search__filter-button'],
    });
    this.filterButton.node.innerHTML = SVG.filterIcon;

    this.searchButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['search__search-button'],
    });
    this.searchButton.node.innerHTML = SVG.searchIcon;
  }

  private getValue(e: Event) {
    return (e.target as HTMLInputElement).value as string;
  }
}
