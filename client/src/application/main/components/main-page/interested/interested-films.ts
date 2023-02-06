import './interested-films.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import LinkElement from '../../../../shared/components/base-elements/link-element';
import storage from '../../../../shared/components/local-storage';
import VisitedCard from './visited-card';
import { ObjectLocalStorage } from '../../../../shared/models/response-data';

export default class InterestedSection extends DOMElement {
  private interestedTitle: DOMElement;

  private interestedLink: DOMElement;

  private interestedCardsList: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['premiere-recomend'],
    });

    this.interestedTitle = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['recomend__title'],
    });

    this.interestedLink = new LinkElement(this.interestedTitle.node, {
      tagName: 'a',
      href: '#',
      classList: ['recomend__title_link'],
      content: 'Вы интересовались',
    });

    this.interestedCardsList = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['interested__cards_list'],
    });

    this.renderCard();
  }

  private renderCard() {
    const container = this.interestedCardsList.node;
    container.innerHTML = '';
    const filmdata = storage.getMovies().slice(-8);
    console.log(filmdata);
    filmdata.map((item: ObjectLocalStorage) => new VisitedCard(container, item));
  }
}
