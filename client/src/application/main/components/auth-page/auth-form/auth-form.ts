import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../shared/components/base-elements/form-element';
import InputElement from '../../../../shared/components/base-elements/input-element';
import storage from '../../../../shared/components/local-storage';
import apiHelpers from '../../../../shared/services/api/api-helpers.service';
import apiService from '../../../../shared/services/api/server-api.service';
import state from '../../../../shared/services/state';
import authService from '../../../services/auth-page/auth.service';
import authValidation from '../../../services/auth-page/validation/validation';

export default class AuthForm extends FormElement {
  public isRegister: boolean;

  private formRow: DOMElement;

  private nameInput: InputElement;

  private nameValidation: DOMElement;

  private passwordInput: InputElement;

  private passwordValidation: DOMElement;

  private submitButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'form',
      classList: ['auth-form'],
      action: '#',
    });
    this.isRegister = false;
    // обработчик сабмита формы
    this.node.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.submit();
    });

    this.formRow = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['auth-form__row'],
    });

    this.nameInput = new InputElement(this.formRow.node, {
      tagName: 'input',
      type: 'text',
      classList: ['auth-form__input'],
      placeholder: 'Логин',
    });
    this.nameInput.node.addEventListener('input', () => {
      if (this.isRegister) {
        apiHelpers.debounce(() => {
          // что тут нужно для проверки на наличие имени?
          console.log('проверить на валидность');
        })();
      }
    });

    this.nameValidation = new DOMElement(this.formRow.node, {
      tagName: 'span',
      classList: ['auth-form__message'],
    });
    authValidation.registerLoginNameMessage(this.nameValidation.node);

    this.formRow = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['auth-form__row'],
    });

    this.passwordInput = new InputElement(this.formRow.node, {
      tagName: 'input',
      type: 'password',
      classList: ['auth-form__input'],
      placeholder: 'Пароль',
    });

    this.passwordValidation = new DOMElement(this.formRow.node, {
      tagName: 'span',
      classList: ['auth-form__message', 'auth-form__message--invalid'],
    });
    authValidation.registerLoginPassMessage(this.passwordValidation.node);

    this.submitButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['auth-form__submit'],
      type: 'submit',
      content: 'Войти',
    });
  }

  public changeMode(isRegister: boolean) {
    this.isRegister = isRegister;
    if (this.isRegister) this.submitButton.node.textContent = 'Зарегистрироваться';
    else this.submitButton.node.textContent = 'Войти';
  }

  public showValidationMessage(type: string, message: string, wrong = false) {
    this.nameValidation.node.textContent = '';
    this.passwordValidation.node.textContent = '';
    const node = type === 'login' ? this.nameValidation.node : this.passwordValidation.node;
    node.textContent = message;
    if (wrong) node.classList.add('auth-form__message--invalid');
    else node.classList.remove('auth-form__message--invalid');
  }

  public async submit() {
    let resp;
    try {
      if (this.isRegister)
        resp = await apiService.registerUser({
          login: this.nameInput.inputNode.value,
          password: this.passwordInput.inputNode.value,
        });
      else
        resp = await apiService.loginUser({
          login: this.nameInput.inputNode.value,
          password: this.passwordInput.inputNode.value,
        });
    } catch (error) {
      console.log(error);
    }
    if (resp && resp.errors) {
      const { msg, param } = resp.errors;
      this.showValidationMessage(param, msg, true);
    }
    if (resp && resp.token) {
      storage.setToken(resp.token);
      state.setUserData({
        logged: true,
        userName: resp.data.login,
        userToken: resp.token,
      });
      await authService.authorization();
      window.location.hash = state.getPreviousPageInfo().previousPageHash as string;
    }
  }
}
