import './watch-later.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import likedFilmsRender from '../../../../services/account-page/liked-films/render-card.service';

export default class WatchLater extends DOMElement {
  private title: DOMElement;

  private list: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['watch-later'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Буду смотреть',
      classList: ['watch-later__title'],
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['watch-later__list'],
    });
    likedFilmsRender.registerContainerWathcLater(this.list.node);
    likedFilmsRender.renderWatchLater();
  }
}
