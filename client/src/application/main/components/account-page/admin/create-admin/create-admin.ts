import './create-admin.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import UserList from './users-list/users-list';

export default class CreateAdmins extends DOMElement {
  private title: DOMElement;

  private table: DOMElement;

  private users: UserList;

  constructor(parentNode: HTMLElement) {
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

    this.users = new UserList(this.table.node);
  }
}
