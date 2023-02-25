import './admin.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ChangePreviere from './change-premiere/change-premiere';
import BlockUsers from './block-users/block-users';
import CreateAdmins from './create-admin/create-admin';

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

    this.premiereBlock = new ChangePreviere(this.node);
    this.createAdmin = new CreateAdmins(this.node);
    this.banBlock = new BlockUsers(this.node);
  }
}
