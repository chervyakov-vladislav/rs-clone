import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';

export default class SecondPage extends Page {
  private premiereContainer: DOMElement;

  constructor(id: string) {
    super(id);

    this.premiereContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['sec-page__dsadasd'],
      content: 'sec-page',
    });

    // this.render();
  }

  // public render() {
  //   console.log('render second');
  //   // какие-то еще коммпоненты
  // }
}
