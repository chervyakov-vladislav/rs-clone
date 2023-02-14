import state from '../../../shared/services/state';

class LoginObserver {
  private headerLogin: HTMLElement;

  constructor() {
    this.headerLogin = document.createElement('button');
  }

  public register(elem: HTMLElement) {
    this.headerLogin = elem;
  }

  public setButtonText() {
    this.headerLogin.textContent = state.allData.login.logged ? `Привет, ${state.allData.login.name}` : 'Войти';
  }
}

const loginObserver = new LoginObserver();
export default loginObserver;