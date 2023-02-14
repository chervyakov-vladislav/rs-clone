import './block-users.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';

export default class BlockUsers extends DOMElement {
  private title: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['block-users'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Забанить пользователей',
      classList: ['block-users__title'],
    });
  }
}
