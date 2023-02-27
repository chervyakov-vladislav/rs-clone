import '../../create-admin/users-list/user-list.scss';
import DOMElement from '../../../../../../shared/components/base-elements/dom-element';
import { UsersList } from '../../../../../../shared/models/state';
import UserCard from '../../user-card/user-card';
import setBannedService from '../../../../../services/account-page/set-banned/set-banned.service';

export default class BannedList extends DOMElement {
  private title: DOMElement;

  private list: DOMElement;

  private cardContainer: DOMElement;

  private userCard: UserCard | null = null;

  constructor(parentNode: HTMLElement, data: UsersList[]) {
    super(parentNode, {
      tagName: 'div',
      classList: ['user-list'],
    });

    this.cardContainer = new DOMElement(null, { tagName: 'div' });

    this.title = new DOMElement(this.node, {
      classList: ['user-list__title'],
      content: 'Забаненные',
      tagName: 'h3',
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['user-list__list'],
    });
    setBannedService.registerBannedList(this.list.node);

    data.forEach((userData, index) => {
      if (userData.role === 'banned') {
        this.cardContainer = new DOMElement(this.list.node, {
          tagName: 'li',
          classList: this.checkStyle(userData),
        });
        this.createUserCard(this.cardContainer.node, data[index]);
        this.cardContainer.node.addEventListener(
          'click',
          setBannedService.appendUser.bind(setBannedService, data[index])
        );
      }
    });
  }

  private createUserCard(parentNode: HTMLElement, data: UsersList) {
    this.userCard = new UserCard(parentNode, data);
  }

  private checkStyle(data: UsersList) {
    if (data.role === 'banned') {
      return ['user-list__card', 'user-list__card--banned'];
    }

    if (data.role === 'admin') {
      return ['user-list__card', 'user-list__card--admin'];
    }

    return ['user-list__card'];
  }
}
