import DOMElement from '../../../../shared/components/base-elements/dom-element';

export default class ListTitle extends DOMElement {
  private desc: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['list-title'],
    });

    this.desc = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['list-litle__desc'],
      content: 'hello',
    });
  }
}
