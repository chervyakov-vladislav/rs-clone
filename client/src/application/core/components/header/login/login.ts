import './login.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import LinkElement from '../../../../shared/components/base-elements/link-element';

export default class Login extends DOMElement {
  private loginBtn: LinkElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['login'],
    });

    this.loginBtn = new LinkElement(this.node, {
      tagName: 'a',
      classList: ['login__button'],
      href: '#auth',
      content: 'Вход',
    });
  }
}
