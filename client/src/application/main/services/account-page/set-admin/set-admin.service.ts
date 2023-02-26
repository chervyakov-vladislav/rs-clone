import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { UsersList } from '../../../../shared/models/state';
import UserCard from '../../../components/account-page/admin/user-card/user-card';

class SetAdmin {
  private userList: HTMLElement = document.createElement('div');

  private adminList: HTMLElement = document.createElement('div');

  private cardContainer: DOMElement | null = null;

  private userCard: UserCard | null = null;

  public registerUserList(elem: HTMLElement) {
    this.userList = elem;
  }

  public registerAdminList(elem: HTMLElement) {
    this.adminList = elem;
  }

  public appendUser(data: UsersList) {
    // добавить в стейте в масссив новых users, убрать из массива новых admins
    this.cardContainer = new DOMElement(this.userList, {
      tagName: 'li',
      classList: ['user-list__card'],
    });
    this.cardContainer.node.addEventListener('click', this.appendAdmin.bind(this, data));
    this.userCard = new UserCard(this.cardContainer.node, data);
    this.removeAdmin(data);
  }

  public appendAdmin(data: UsersList) {
    // добавить в стейте в масссив новых admins, убрать из массива новых users
    this.cardContainer = new DOMElement(this.adminList, {
      tagName: 'li',
      classList: ['user-list__card', 'user-list__card--admin'],
    });
    this.cardContainer.node.addEventListener('click', this.appendUser.bind(this, data));
    this.userCard = new UserCard(this.cardContainer.node, data);
    this.removeUser(data);
  }

  private removeAdmin(data: UsersList) {
    const namesArr = Array.from(this.adminList.querySelectorAll('.user-card__login')).map((item) => item.innerHTML);
    const removeIndex = namesArr.indexOf(data.login);
    this.adminList.childNodes[removeIndex].remove();
  }

  private removeUser(data: UsersList) {
    const namesArr = Array.from(this.userList.querySelectorAll('.user-card__login')).map((item) => item.innerHTML);
    const removeIndex = namesArr.indexOf(data.login);
    this.userList.childNodes[removeIndex].remove();
  }
}

const setAdminService = new SetAdmin();
export default setAdminService;