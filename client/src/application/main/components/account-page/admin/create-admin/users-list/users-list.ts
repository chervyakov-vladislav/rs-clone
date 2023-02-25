import DOMElement from '../../../../../../shared/components/base-elements/dom-element';
import state from '../../../../../../shared/services/state';

export default class UserList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['admin-users'],
    });

    this.loadUsers();
  }

  private loadUsers() {
    // await state.setUserList();
    const role = state.getUserRole();
    const users = state.getUserList();
    console.log(users);
    console.log(role);
  }
}
