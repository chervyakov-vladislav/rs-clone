import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';

export default class ExtendedSearchPage extends Page {
  private container: DOMElement;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['extended-search__container'],
      content: 'extended',
    });
  }
}
