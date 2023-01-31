import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';
import { SVG } from '../../../../shared/components/svg-icons';

export class Search extends DOMElement {
  private input: InputElement;

  private filterButton: ButtonElement;

  private searchButton: ButtonElement;

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
  }
}
