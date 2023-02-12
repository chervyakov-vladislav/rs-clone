import './login.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import LoginMenu from './login-menu/login-menu';
import apiService from '../../../../shared/services/api/server-api.service';

export default class Login extends DOMElement {
  private loginBtn: ButtonElement;

  private loginMenu: LoginMenu;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['login'],
    });
    this.loginMenu = new LoginMenu(this.node);
    this.node.addEventListener('click', () => {
      apiService.authorizationUser().then((res) => {
        if (!res.ok) window.location.hash = '#auth';
      });
      // if (this.loginMenu !== null) {
      //   const { node } = this.loginMenu as LoginMenu;
      //   node.remove();
      // }
    });

    this.loginBtn = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['login__button'],
      content: 'Войти',
    });
  }
}
