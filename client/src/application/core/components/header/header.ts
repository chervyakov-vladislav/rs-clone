import './header.scss';

import { ButtonElement } from '../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../shared/components/base-elements/image-element';
import { Search } from './search/search';

export class Header extends DOMElement {
  private container: DOMElement;

  private headerButtons: DOMElement;

  private headerLogo: DOMElement;

  public headerLogoContainer: ButtonElement;

  private search: Search;

  // public winnersButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'header',
      classList: ['header'],
    });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'header__container'],
    });

    this.headerLogoContainer = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['header__logo'],
    });

    this.headerLogo = new ImageElement(this.headerLogoContainer.node, {
      tagName: 'img',
      classList: ['header__pic'],
      src: './../../../../assets/images/kinopoisk.png',
    });

    this.headerButtons = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['header__buttons'],
    });

    this.search = new Search(this.headerButtons.node);
  }
}
