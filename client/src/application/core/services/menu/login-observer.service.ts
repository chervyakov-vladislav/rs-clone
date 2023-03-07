import state from '../../../shared/services/state';
import HeaderAvatar from '../../components/header/login/avatar/header-avatar';

class LoginObserver {
  private loginContainer: HTMLElement;

  private headerLogin: HTMLElement;

  private avatar: HTMLElement;

  private reviewForm: HTMLElement;

  constructor() {
    this.headerLogin = document.createElement('button');
    this.loginContainer = document.createElement('div');
    this.avatar = document.createElement('div');
    this.reviewForm = document.createElement('div');
  }

  public register(elem: HTMLElement) {
    this.headerLogin = elem;
  }

  public registerContainer(elem: HTMLElement) {
    this.loginContainer = elem;
  }

  public registerReviewForm(elem: HTMLElement) {
    this.reviewForm = elem;
  }

  public setButtonText() {
    this.headerLogin.textContent = state.allData.account.userData.logged
      ? `Привет, ${state.allData.account.userData.userName}`
      : 'Войти';
    this.setAvatar();
  }

  private setAvatar() {
    const { userPhoto } = state.allData.account.userData;
    this.avatar.remove();
    this.avatar = new HeaderAvatar(this.loginContainer, userPhoto).node;
    if (state.allData.account.userData.logged) {
      this.loginContainer.append(this.avatar);
    } else {
      this.avatar.remove();
    }
  }

  public removeAvatar() {
    this.avatar.remove();
  }

  public changeAvatar() {
    const { userPhoto } = state.allData.account.userData;
    (this.avatar as HTMLImageElement).src = `${userPhoto}`;
  }

  public removeMoviePageElems() {
    this.reviewForm.remove();
  }
}

const loginObserver = new LoginObserver();
export default loginObserver;
