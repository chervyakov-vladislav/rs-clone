import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import InputElement from '../../../shared/components/base-elements/input-element';

export default class AuthForm extends DOMElement {
  private loginInput: InputElement;

  private passwordInput: InputElement;

  private authButton: ButtonElement;

  private isRegister: boolean;

  constructor(parentNode: HTMLElement) {
    super(parentNode, { tagName: 'div', classList: ['auth__form'] });
    this.isRegister = false;
    this.loginInput = new InputElement(this.node, {
      tagName: 'input',
      type: 'text',
      placeholder: 'input login',
      classList: ['auth__input', 'auth__input-login'],
    });
    this.passwordInput = new InputElement(this.node, {
      tagName: 'input',
      type: 'password',
      placeholder: 'input password',
      classList: ['auth__input', 'auth__input-password'],
    });
    this.authButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['auth__button'],
      content: 'Login',
    });
  }

  public toggleIsRegister() {
    this.isRegister = !this.isRegister;
    this.authButton.node.textContent = this.isRegister ? 'Register' : 'Login';
  }
}
