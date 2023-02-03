import DOMElement from '../../../../../shared/components/base-elements/dom-element';

export default class PlayerControls extends DOMElement {
  constructor(parantNode: HTMLElement) {
    super(parantNode, {
      tagName: 'div',
      classList: ['controls'],
    });
  }
}
