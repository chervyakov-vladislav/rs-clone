import './recomend.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import SVG from '../../../../shared/components/svg-icons';
import LinkElement from '../../../../shared/components/base-elements/link-element';
import state from '../../../../shared/services/state';
import MovieCard from '../card';

export default class RecomendSection extends DOMElement {
  private recomendTitle: DOMElement;

  private recomendLink: DOMElement;

  private recomendPic: DOMElement;

  private recomendCardsList: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['premiere-recomend'],
    });

    this.recomendTitle = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['recomend__title'],
    });

    this.recomendLink = new LinkElement(this.recomendTitle.node, {
      tagName: 'a',
      href: '#recomend',
      classList: ['recomend__title_link'],
      content: 'Рекомендации',
    });

    this.recomendLink.node.addEventListener('click', () => {
      window.location.hash = '#recomend';
    });

    this.recomendPic = new DOMElement(this.recomendTitle.node, {
      tagName: 'span',
      classList: ['recomend__pic'],
    });
    this.recomendPic.node.innerHTML = SVG.recomendArrow;

    this.recomendCardsList = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['recomend__cards_list'],
    });

    this.renderCard();
  }

  private renderCard() {
    const container = this.recomendCardsList.node;
    container.innerHTML = '';
    const filmdata = state.allData.films.slice(0, 6);

    filmdata.map((item) => new MovieCard(container, item));
  }
}
