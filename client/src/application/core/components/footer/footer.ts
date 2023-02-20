import './footer.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Developers from './developers/developers';
import LinkElement from '../../../shared/components/base-elements/link-element';
import SVG from '../../../shared/components/svg-icons';

export default class Footer extends DOMElement {
  private container: DOMElement;

  private developers: Developers;

  private year: DOMElement;

  private icon: LinkElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'footer',
      classList: ['footer'],
    });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'footer__container'],
    });

    this.developers = new Developers(this.container.node);

    this.year = new DOMElement(this.container.node, {
      tagName: 'span',
      classList: ['footer__year'],
      content: new Date().getFullYear().toString(),
    });

    this.icon = new LinkElement(this.container.node, {
      tagName: 'a',
      classList: ['footer__rs'],
      target: '_blank',
      href: 'https://rs.school/',
    });
    this.icon.node.innerHTML = SVG.rsschool;
  }
}
