import './create-admin.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import UserList from './users-list/users-list';
import { UsersList } from '../../../../../shared/models/state';
import AdminList from './admin-list/admin-list';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import setAdminService from '../../../../services/account-page/set-admin/set-admin.service';

export default class CreateAdmins extends DOMElement {
  private title: DOMElement;

  private table: DOMElement;

  private users: UserList;

  private admins: AdminList;

  private changeButton: ButtonElement;

  constructor(parentNode: HTMLElement, data: UsersList[]) {
    super(parentNode, {
      tagName: 'div',
      classList: ['create-admin'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Назначить администраторов',
      classList: ['create-admin__title'],
    });

    this.table = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['create-admin__table'],
    });

    this.users = new UserList(this.table.node, data);
    this.admins = new AdminList(this.table.node, data);

    this.changeButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['create-admin__button'],
      content: 'Назначить администраторов',
    });
    this.changeButton.node.addEventListener('click', () => {
      setAdminService.submitNewRolesToServer();
      this.changeButton.node.innerText = 'Новые роли назначены';
      setTimeout(() => {
        this.changeButton.node.innerText = 'Назначить администраторов';
      }, 5_000);
    });
  }
}
