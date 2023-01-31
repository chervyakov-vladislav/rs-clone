import './header.scss';

import { ButtonElement } from '../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Search } from './search/search';
import { Login } from './login/login';
import { SVG } from '../../../shared/components/svg-icons';
import { LinkElement } from '../../../shared/components/base-elements/link-element';

export class Header extends DOMElement {
  private container: DOMElement;

  private headerButtons: DOMElement;

  public headerLogoContainer: ButtonElement;

  private search: Search;

  private login: Login;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'header',
      classList: ['header'],
    });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'header__container'],
    });

    this.headerLogoContainer = new LinkElement(this.container.node, {
      tagName: 'a',
      classList: ['header__logo'],
      href: '/',
    });
    this.headerLogoContainer.node.innerHTML = SVG.headerLogo;

    this.headerButtons = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['header__buttons'],
    });

    this.search = new Search(this.headerButtons.node);
    this.login = new Login(this.headerButtons.node);
  }
}
