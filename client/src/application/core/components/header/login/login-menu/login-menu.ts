import './login-menu.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';

export class LoginMenu extends DOMElement {
  private accauntLink: DOMElement;

  private exitButton: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['login-menu'],
    });

    this.accauntLink = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['login-menu__item'],
      content: 'Личный кабинет',
    });

    this.exitButton = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['login-menu__item'],
      content: 'Выйти',
    });
  }
}
