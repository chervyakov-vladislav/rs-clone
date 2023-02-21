import './developers.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import LinkElement from '../../../../shared/components/base-elements/link-element';
import SVG from '../../../../shared/components/svg-icons';

export default class Developers extends DOMElement {
  private developer: DOMElement;

  private devLink: LinkElement;

  private devIcon: DOMElement;

  private devName: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['developers'],
    });

    this.developer = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['developers__unit'],
    });

    this.devLink = new LinkElement(this.developer.node, {
      tagName: 'a',
      classList: ['developers__link'],
      href: 'https://github.com/chervyakov-vladislav',
      target: '_blank',
    });

    this.devIcon = new DOMElement(this.devLink.node, {
      tagName: 'div',
      classList: ['developers__icon'],
    });
    this.devIcon.node.innerHTML = SVG.github;

    this.devName = new DOMElement(this.devLink.node, {
      tagName: 'span',
      classList: ['developers__name'],
      content: 'Chervyakov V',
    });

    this.developer = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['developers__unit'],
    });

    this.devLink = new LinkElement(this.developer.node, {
      tagName: 'a',
      classList: ['developers__link'],
      href: 'https://github.com/CTpaTer',
      target: '_blank',
    });

    this.devIcon = new DOMElement(this.devLink.node, {
      tagName: 'div',
      classList: ['developers__icon'],
    });
    this.devIcon.node.innerHTML = SVG.github;

    this.devName = new DOMElement(this.devLink.node, {
      tagName: 'span',
      classList: ['developers__name'],
      content: 'Demaev P',
    });

    this.developer = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['developers__unit'],
    });

    this.devLink = new LinkElement(this.developer.node, {
      tagName: 'a',
      classList: ['developers__link'],
      href: 'https://github.com/EXisTAnZ',
      target: '_blank',
    });

    this.devIcon = new DOMElement(this.devLink.node, {
      tagName: 'div',
      classList: ['developers__icon'],
    });
    this.devIcon.node.innerHTML = SVG.github;

    this.devName = new DOMElement(this.devLink.node, {
      tagName: 'span',
      classList: ['developers__name'],
      content: 'Oziev M',
    });
  }
}
