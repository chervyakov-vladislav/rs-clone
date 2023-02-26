import loginObserver from '../../../core/services/menu/login-observer.service';
import { Role } from '../../../shared/models/state';
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
        userLogin: auth.data.login,
        userName: auth.data.name,
        userPhoto: auth.data.avatar,
        userRole: auth.data.role as Role,
      });
    } else {
      state.setUserData({
        logged: false,
        userLogin: '',
        userName: '',
      });
    }
    loginObserver.setButtonText();
    if (state.allData.account.userData.userRole === 'admin') {
      await state.setUserList();
    }
  }
}

const authService: AuthService = new AuthService();
export default authService;
