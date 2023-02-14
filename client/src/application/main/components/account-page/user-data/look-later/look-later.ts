import './look-later.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';

export default class LookLater extends DOMElement {
  private title: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['look-later'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Буду смотреть',
      classList: ['look-later__title'],
    });
  }
}
