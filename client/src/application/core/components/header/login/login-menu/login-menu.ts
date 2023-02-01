import './login-menu.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { LinkElement } from '../../../../../shared/components/base-elements/link-element';
import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';

export default class LoginMenu extends DOMElement {
  private accountItem: DOMElement;

  private accountLink: LinkElement;

  private exitItem: DOMElement;

  private exitButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['login-menu'],
    });

    this.accountItem = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['login-menu__item'],
    });

    this.accountLink = new LinkElement(this.accountItem.node, {
      tagName: 'a',
      classList: ['login-menu__link'],
      content: 'Личный кабинет',
      href: '#',
    });

    this.exitItem = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['login-menu__item'],
    });

    this.exitButton = new ButtonElement(this.exitItem.node, {
      tagName: 'button',
      classList: ['login-menu__link'],
      content: 'Выйти',
    });
  }
}
