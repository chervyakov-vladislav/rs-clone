import './link-buttons.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import LinkElement from '../../../../../shared/components/base-elements/link-element';

export default class LinksModal extends DOMElement {
  public openLink: LinkElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['wallpepers-links'],
    });

    this.openLink = new LinkElement(this.node, {
      tagName: 'a',
      classList: ['wallpepers-links__open'],
      content: 'открыть в новом окне',
      target: '_blank',
    });
  }
}
