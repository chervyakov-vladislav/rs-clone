import './login.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import LoginMenu from './login-menu/login-menu';
import state from '../../../../shared/services/state';
import loginObserver from '../../../services/menu/login-observer.service';

export default class Login extends DOMElement {
  private loginBtn: ButtonElement;

  private loginMenu: LoginMenu;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['login'],
    });
    this.loginMenu = new LoginMenu(this.node);
    this.loginMenu.node.remove();
    this.node.addEventListener('click', () => {
      if (state.allData.account.userData.logged) this.loginMenu = new LoginMenu(this.node);
    });

    this.loginBtn = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['login__button'],
      content: state.allData.account.userData.logged ? `Привет, ${state.allData.account.userData}` : 'Войти',
    });
    this.loginBtn.node.addEventListener('click', () => {
      if (!state.allData.account.userData.logged) window.location.hash = '#auth';
    });
    loginObserver.register(this.loginBtn.node);
  }
}
