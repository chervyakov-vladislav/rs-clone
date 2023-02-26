import './admin.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ChangePreviere from './change-premiere/change-premiere';
import BlockUsers from './block-users/block-users';
import CreateAdmins from './create-admin/create-admin';
import state from '../../../../shared/services/state';

export default class AdminData extends DOMElement {
  private title: DOMElement;

  private premiereBlock: ChangePreviere;

  private createAdmin: CreateAdmins;

  private banBlock: BlockUsers;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['admin-data'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      classList: ['admin-data__title'],
      content: 'Администрирование',
    });

    const data = state.getUserList();

    this.premiereBlock = new ChangePreviere(this.node);
    this.createAdmin = new CreateAdmins(this.node, data);
    this.banBlock = new BlockUsers(this.node);
  }
}
