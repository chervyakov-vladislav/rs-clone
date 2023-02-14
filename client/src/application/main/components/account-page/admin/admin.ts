import './admin.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ChangePreviere from './change-premiere/change-premiere';
import BlockUsers from './block-users/block-users';

export default class AdminData extends DOMElement {
  private title: DOMElement;

  private premiereBlock: ChangePreviere;

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
    this.banBlock = new BlockUsers(this.node);
  }
}
