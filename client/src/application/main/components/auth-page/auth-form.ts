import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import InputElement from '../../../shared/components/base-elements/input-element';
import apiService from '../../../shared/services/api/server-api.service';

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
      placeholder: 'Логин',
      classList: ['auth__input', 'auth__input-login'],
    });
    this.passwordInput = new InputElement(this.node, {
      tagName: 'input',
      type: 'password',
      placeholder: 'Пароль',
      classList: ['auth__input', 'auth__input-password'],
    });
    this.authButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['auth__button'],
      content: 'Login',
    });

    this.authButton.node.addEventListener('click', () => {
      if (this.isRegister)
        apiService.registerUser({
          login: this.loginInput.inputNode.value,
          password: this.passwordInput.inputNode.value,
        });
      else
        apiService.loginUser({
          login: this.loginInput.inputNode.value,
          password: this.passwordInput.inputNode.value,
        });
    });
  }

  public toggleIsRegister() {
    this.isRegister = !this.isRegister;
    this.authButton.node.textContent = this.isRegister ? 'Register' : 'Login';
  }
}
