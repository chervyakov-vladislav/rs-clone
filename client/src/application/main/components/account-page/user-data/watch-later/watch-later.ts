import './watch-later.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import likedFilmsRender from '../../../../services/account-page/liked-films/render-card.service';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import state from '../../../../../shared/services/state';

export default class WatchLater extends DOMElement {
  private title: DOMElement;

  private container: DOMElement;

  private remove: ButtonElement;

  private list: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['watch-later'],
    });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['watch-later__container'],
    });

    this.title = new DOMElement(this.container.node, {
      tagName: 'h2',
      content: 'Буду смотреть',
      classList: ['watch-later__title'],
    });

    this.remove = new ButtonElement(this.container.node, {
      tagName: 'button',
      classList: ['watch-later__remove'],
      content: 'Очистить список',
    });
    this.remove.node.addEventListener('click', () => {
      // запрос на бек, что бы очистить список
      state.allData.account.watchLaterFilms = [];
      this.node.remove();
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['watch-later__list'],
    });
    likedFilmsRender.registerContainerWathcLater(this.list.node);
    likedFilmsRender.renderWatchLater();
  }
}
