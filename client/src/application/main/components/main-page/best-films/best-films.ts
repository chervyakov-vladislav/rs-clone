import '../recomend/recomend.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import SVG from '../../../../shared/components/svg-icons';
import LinkElement from '../../../../shared/components/base-elements/link-element';
import state from '../../../../shared/services/state';
import MovieCard from '../card';

export default class BestSection extends DOMElement {
  private bestTitle: DOMElement;

  private bestLink: DOMElement;

  private bestPic: DOMElement;

  private bestCardsList: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['premiere-recomend'],
    });

    this.bestTitle = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['recomend__title'],
    });

    this.bestLink = new LinkElement(this.bestTitle.node, {
      tagName: 'a',
      href: '#',
      classList: ['recomend__title_link'],
      content: 'Лучшие фильмы',
    });

    this.bestPic = new DOMElement(this.bestTitle.node, {
      tagName: 'span',
      classList: ['recomend__pic'],
    });
    this.bestPic.node.innerHTML = SVG.recomendArrow;

    this.bestTitle.node.addEventListener('click', () => {
      console.log(state.allData.films[1].posterUrlPreview);
      window.location.hash = '#premiere';
    });

    this.bestCardsList = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['recomend__cards_list'],
    });

    this.renderCard();
  }

  private renderCard() {
    const container = this.bestCardsList.node;
    container.innerHTML = '';
    const filmdata = state.allData.best.slice(0, 6);

    filmdata.map((item) => new MovieCard(container, item));
  }
}
