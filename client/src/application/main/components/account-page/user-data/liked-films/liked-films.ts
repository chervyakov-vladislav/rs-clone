import './liked-films.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import likedFilmsRender from '../../../../services/account-page/liked-films/render-card.service';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import state from '../../../../../shared/services/state';

export default class LikedFilms extends DOMElement {
  private title: DOMElement;

  private container: DOMElement;

  private remove: ButtonElement;

  private list: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['liked-films'],
    });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['liked-films__container'],
    });

    this.title = new DOMElement(this.container.node, {
      tagName: 'h2',
      content: 'Вы оценили',
      classList: ['liked-films__title'],
    });

    this.remove = new ButtonElement(this.container.node, {
      tagName: 'button',
      classList: ['liked-films__remove'],
      content: 'Очистить список',
    });
    this.remove.node.addEventListener('click', () => {
      // запрос на бек, что бы очистить список
      state.allData.account.likedFilms = [];
      this.node.remove();
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['watch-later__list'],
    });
    likedFilmsRender.registerContainerLiked(this.list.node);
    likedFilmsRender.renderLikedList();
  }
}
