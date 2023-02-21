import './account-page.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import AdminData from '../../components/account-page/admin/admin';
import UserData from '../../components/account-page/user-data/user-data';

export default class AccountPage extends Page {
  private container: DOMElement;

  private userData: UserData;

  private adminData: AdminData;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['account-page__container'],
    });

    this.userData = new UserData(this.container.node);
    // если мы админ, то добавляем блок для админа
    this.adminData = new AdminData(this.container.node);
  }
}
