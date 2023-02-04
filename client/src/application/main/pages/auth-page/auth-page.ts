import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';

export default class AuthPage extends Page {
  private loginForm: DOMElement;

  private registrationForm: DOMElement;

  constructor(id: string) {
    super(id);
    this.loginForm = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['auth__form', 'auth__form-login'],
      content: 'Login Form',
    });
    this.registrationForm = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['auth__form', 'auth__form-registration'],
      content: 'Registration Form',
    });

    this.render();
  }

  public render() {
    console.log('lalala');
  }
}
