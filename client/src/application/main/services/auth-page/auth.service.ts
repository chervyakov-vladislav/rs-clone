import loginObserver from '../../../core/services/menu/login-observer.service';
import apiService from '../../../shared/services/api/server-api.service';
import state from '../../../shared/services/state';

class AuthService {
  private token: string;

  constructor() {
    this.token = '';
  }

  public async authorization() {
    const auth = await apiService.authorizationUser();
    if (!auth.errors) {
      state.setUserData({
        logged: true,
        userName: auth.data.login,
      });
    } else {
      state.setUserData({
        logged: false,
        userName: '',
      });
    }
    loginObserver.setButtonText();
  }
}

const authService: AuthService = new AuthService();
export default authService;
