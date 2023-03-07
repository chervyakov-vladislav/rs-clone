import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { UsersList } from '../../../../shared/models/state';
import apiService from '../../../../shared/services/api/server-api.service';
import state from '../../../../shared/services/state';
import UserCard from '../../../components/account-page/admin/user-card/user-card';

class SetBanned {
  private userList: HTMLElement = document.createElement('div');

  private bannedList: HTMLElement = document.createElement('div');

  private cardContainer: DOMElement | null = null;

  private userCard: UserCard | null = null;

  public registerUserList(elem: HTMLElement) {
    this.userList = elem;
  }

  public registerBannedList(elem: HTMLElement) {
    this.bannedList = elem;
  }

  public appendBanned(data: UsersList) {
    this.appendBannedToState(data);
    this.cardContainer = new DOMElement(this.bannedList, {
      tagName: 'li',
      classList: ['user-list__card', 'user-list__card--banned'],
    });
    this.cardContainer.node.addEventListener('click', this.appendUser.bind(this, data));
    this.userCard = new UserCard(this.cardContainer.node, data);
    this.removeUser(data);
  }

  public appendUser(data: UsersList) {
    this.appendUserToState(data);
    this.cardContainer = new DOMElement(this.userList, {
      tagName: 'li',
      classList: ['user-list__card'],
    });
    this.cardContainer.node.addEventListener('click', this.appendBanned.bind(this, data));
    this.userCard = new UserCard(this.cardContainer.node, data);
    this.removeBanned(data);
  }

  private appendBannedToState(data: UsersList) {
    const currrntRoles = state.getNewRoles();
    state.setNewBannedOne(data);
    const newUsersArr = currrntRoles.users.filter((el) => el !== data);
    state.setNewUsersArr(newUsersArr);
  }

  private appendUserToState(data: UsersList) {
    const currrntRoles = state.getNewRoles();
    state.setNewUsersOne(data);
    const newBannedArr = currrntRoles.banned.filter((el) => el !== data);
    state.setNewBannedArr(newBannedArr);
  }

  private removeBanned(data: UsersList) {
    const namesArr = Array.from(this.bannedList.querySelectorAll('.user-card__login')).map((item) => item.innerHTML);
    const removeIndex = namesArr.indexOf(data.login);
    this.bannedList.childNodes[removeIndex].remove();
  }

  private removeUser(data: UsersList) {
    const namesArr = Array.from(this.userList.querySelectorAll('.user-card__login')).map((item) => item.innerHTML);
    const removeIndex = namesArr.indexOf(data.login);
    this.userList.childNodes[removeIndex].remove();
  }

  public submitNewRolesToServer() {
    const currrntRoles = state.getNewRoles();
    currrntRoles.banned.forEach(async (user) => {
      const params = {
        role: 'banned',
        login: user.login,
      };
      await apiService.updateUser(params);
      await apiService.deleteUserReviews(user.login);
      state.resetReviews();
    });

    currrntRoles.users.forEach((user) => {
      const params = {
        role: 'user',
        login: user.login,
      };
      apiService.updateUser(params);
    });
  }
}

const setBannedService = new SetBanned();
export default setBannedService;
