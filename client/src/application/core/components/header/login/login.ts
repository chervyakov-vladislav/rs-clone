import './login.scss';
import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { LoginMenu } from './login-menu/login-menu';

export class Login extends ButtonElement {
  private menu: LoginMenu;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'button',
      classList: ['login'],
      content: 'Вход',
    });

    this.menu = new LoginMenu(this.node);
  }
}
