import DOMElement from '../../../../shared/components/base-elements/dom-element';

export default class ExtendedSearchForm extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['extended-search-form'],
      content: 'search-form',
    });
    console.log(this.node.innerText);
  }
}
