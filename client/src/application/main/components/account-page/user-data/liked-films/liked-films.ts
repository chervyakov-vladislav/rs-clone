import './liked-films.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import likedFilmsRender from '../../../../services/account-page/liked-films/render-card.service';

export default class LikedFilms extends DOMElement {
  private title: DOMElement;

  private list: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['liked-films'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Вы оценили',
      classList: ['liked-films__title'],
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['watch-later__list'],
    });
    likedFilmsRender.registerContainerLiked(this.list.node);
    likedFilmsRender.renderLikedList();
  }
}
