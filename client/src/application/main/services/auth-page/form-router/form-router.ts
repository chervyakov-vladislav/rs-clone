import LoginForm from '../../../components/auth-page/login-form/login-form';
import RegistrationForm from '../../../components/auth-page/registration-form/regestration-form';

class FormRouter {
  private container: HTMLElement | null = null;

  private loginForm: LoginForm | null = null;

  private registerForm: RegistrationForm | null = null;

  public appendContainer(elem: HTMLElement) {
    this.container = elem;
    this.loginForm = new LoginForm(this.container);
  }

  public routeRegister() {
    const container = this.container as HTMLElement;
    if (!this.registerForm) this.registerForm = new RegistrationForm(container);
    container.innerHTML = '';
    container.append((this.registerForm as RegistrationForm).node);
  }

  public routeLogin() {
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    container.append((this.loginForm as LoginForm).node);
  }
}

const formRouter = new FormRouter();
export default formRouter;
