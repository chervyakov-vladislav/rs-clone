import './search.scss';
import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';
import { SVG } from '../../../../shared/components/svg-icons';
import { Suggest } from './search-suggest/search-suggest';

export class Search extends DOMElement {
  private input: InputElement;

  private filterButton: ButtonElement;

  private searchButton: ButtonElement;

  private suggest: Suggest;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['search'],
    });

    this.input = new InputElement(this.node, {
      tagName: 'input',
      classList: ['search__input-text'],
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

    this.suggest = new Suggest(this.node);
  }
}
