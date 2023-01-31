import './login.scss';
import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { LoginMenu } from './login-menu/login-menu';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';

export class Login extends DOMElement {
  private menu: LoginMenu;

  private loginBtn: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['login'],
    });

    this.loginBtn = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['login__button'],
      content: 'Вход',
    });

    this.menu = new LoginMenu(this.node);
  }
}
