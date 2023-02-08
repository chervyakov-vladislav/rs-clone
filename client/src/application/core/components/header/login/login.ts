import './login.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import LoginMenu from './login-menu/login-menu';

export default class Login extends DOMElement {
  private loginBtn: ButtonElement;

  private loginMenu: LoginMenu | null = null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['login'],
    });
    this.node.addEventListener('click', () => {
      // проверка на авторизацию. Если авторизованы, то выпадает менюха
      // если не авторизованы перебразывает на авторизацию
      window.location.hash = '#auth';
      if (this.loginMenu !== null) {
        const { node } = this.loginMenu as LoginMenu;
        node.remove();
      }
      this.loginMenu = new LoginMenu(this.node);
    });

    this.loginBtn = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['login__button'],
      content: 'Войти',
    });
  }
}
