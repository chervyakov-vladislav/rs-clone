import { DOMElement } from '../../../../shared/components/base-elements/dom-element';

export default class PremierePreview extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['premiere-preview'],
      content: 'page element: premiere',
    });
    console.log('render main page component');
  }
}
