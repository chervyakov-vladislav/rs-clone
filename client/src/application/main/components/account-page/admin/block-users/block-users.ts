import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import UserList from './user-list/users-list';
import { UsersList } from '../../../../../shared/models/state';
import BannedList from './banned-list/banned-list';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';

export default class BlockUsers extends DOMElement {
  private title: DOMElement;

  private table: DOMElement;

  private users: UserList;

  private banned: BannedList;

  private changeButton: ButtonElement;

  constructor(parentNode: HTMLElement, data: UsersList[]) {
    super(parentNode, {
      tagName: 'div',
      classList: ['create-admin'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Забанить пользователей',
      classList: ['create-admin__title'],
    });

    this.table = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['create-admin__table'],
    });

    this.users = new UserList(this.table.node, data);
    this.banned = new BannedList(this.table.node, data);

    this.changeButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['create-admin__button'],
      content: 'Забанить/разбанить пользователей',
    });
    this.changeButton.node.addEventListener('click', () => {
      // setAdminService.submitNewRolesToServer();
      this.changeButton.node.innerText = 'Новые роли назначены';
      setTimeout(() => {
        this.changeButton.node.innerText = 'Забанить/разбанить пользователей';
      }, 5_000);
    });
  }
}
