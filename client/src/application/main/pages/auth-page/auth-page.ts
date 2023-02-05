import './auth-page.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import AuthForm from '../../components/auth-page/auth-form';

export default class AuthPage extends Page {
  private togglerRegLog: DOMElement;

  private authForm: AuthForm;

  constructor(id: string) {
    super(id);

    this.togglerRegLog = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['auth__toggler'],
      content: 'Login  Register',
    });
    this.togglerRegLog.node.addEventListener('click', () => this.render());
    this.authForm = new AuthForm(this.node);
  }

  public render() {
    this.authForm.toggleIsRegister();
  }
}
