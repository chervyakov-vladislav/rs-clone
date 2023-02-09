import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import ListTitle from '../../components/search-page/list-title/list-title';

export default class SearchPage extends Page {
  private container: DOMElement;

  private title: DOMElement;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['search-page__container'],
    });

    this.title = new ListTitle(this.container.node);
  }
}
