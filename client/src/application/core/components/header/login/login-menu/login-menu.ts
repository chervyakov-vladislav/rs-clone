import './login-menu.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import LinkElement from '../../../../../shared/components/base-elements/link-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import headerObserver from '../../../../services/menu/header-observer.service';
import storage from '../../../../../shared/components/local-storage';
import state from '../../../../../shared/services/state';
import loginObserver from '../../../../services/menu/login-observer.service';

export default class LoginMenu extends DOMElement {
  private isHidden: boolean;

  private accountItem: DOMElement;

  private accountLink: LinkElement;

  private exitItem: DOMElement;

  private exitButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['login-menu'],
    });
    this.isHidden = true;
    headerObserver.register(this);

    this.accountItem = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['login-menu__item'],
    });

    this.accountLink = new LinkElement(this.accountItem.node, {
      tagName: 'a',
      classList: ['login-menu__link'],
      content: 'Личный кабинет',
      href: '#account',
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

    this.exitButton.node.addEventListener('click', () => {
      storage.setToken('');
      state.allData.login = {
        logged: false,
        name: '',
        token: '',
      };
      loginObserver.setButtonText();
      this.node.remove();
    });
  }
}
