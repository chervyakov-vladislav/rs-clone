import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../shared/components/base-elements/form-element';
import InputElement from '../../../../shared/components/base-elements/input-element';
import authValidation from '../../../services/auth-page/validation/validation';

export default class LoginForm extends FormElement {
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
    // обработчик сабмита формы
    this.node.addEventListener('submit', (e) => e.preventDefault());

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

    this.nameValidation = new DOMElement(this.formRow.node, {
      tagName: 'span',
      classList: ['auth-form__message'],
      content: 'Пример хорошего сообщения',
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
      content: 'Пример плохого сообщения',
    });
    authValidation.registerLoginPassMessage(this.passwordValidation.node);

    this.submitButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['auth-form__submit'],
      type: 'submit',
      content: 'Войти',
    });
  }
}
