import './user-card.scss';
import userPhoto from '../../../../../../assets/images/login.png';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../../shared/components/base-elements/image-element';
import { UsersList } from '../../../../../shared/models/state';

export default class UserCard extends DOMElement {
  private userPicWrapper: DOMElement;

  private userPhoto: ImageElement;

  private descriptionContainer: DOMElement;

  private name: DOMElement;

  private login: DOMElement;

  constructor(parentNode: HTMLElement, data: UsersList) {
    super(parentNode, {
      tagName: 'div',
      classList: ['user-card'],
    });

    this.userPicWrapper = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['user-card__image-wrapper'],
    });

    this.userPhoto = new ImageElement(this.userPicWrapper.node, {
      tagName: 'img',
      classList: ['user-card__image'],
      src: data.avatar ? data.avatar : userPhoto,
    });

    this.descriptionContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['user-card__desc'],
    });

    this.name = new DOMElement(this.descriptionContainer.node, {
      tagName: 'p',
      classList: ['user-card__name'],
      content: data.name ? data.name : data.login,
    });

    this.login = new DOMElement(this.descriptionContainer.node, {
      tagName: 'p',
      classList: ['user-card__login'],
      content: data.login,
    });
  }
}
