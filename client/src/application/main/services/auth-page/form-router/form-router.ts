import RegistrationForm from '../../../components/auth-page/registration-form/regestration-form';

class FormRouter {
  private container: HTMLElement | null = null;

  private loginForm: HTMLElement | null = null;

  private registerForm: RegistrationForm | null = null;

  public appendContainer(elem: HTMLElement) {
    this.container = elem;
    this.registerForm = new RegistrationForm(this.container);
  }

  public appendLoginForm(elem: HTMLElement) {
    this.loginForm = elem;
  }

  public routeRegister() {
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    container.append((this.registerForm as RegistrationForm).node);
  }

  public routeLogin() {
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    container.append(this.loginForm as HTMLElement);
  }
}

const formRouter = new FormRouter();
export default formRouter;
