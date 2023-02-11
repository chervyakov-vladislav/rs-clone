import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import LinkElement from '../../../../shared/components/base-elements/link-element';
import { ObjectLocalStorage } from '../../../../shared/models/response-data';

export default class VisitedCard {
  private visitedCard: DOMElement;

  private visitedCardLink: LinkElement;

  private visitedCardPoster: DOMElement;

  private visitedCardPosterImage: ImageElement;

  constructor(container: HTMLElement, item: ObjectLocalStorage) {
    this.visitedCard = new DOMElement(container, {
      tagName: 'div',
      classList: ['interested__card'],
    });

    this.visitedCard.node.addEventListener('click', () => {
      window.location.hash = `#movie/${item.filmId}`;
    });

    this.visitedCardLink = new LinkElement(this.visitedCard.node, {
      tagName: 'a',
      href: `#movie/${item.filmId}`,
      classList: ['interested__card_link'],
      content: '',
    });
    this.visitedCardPoster = new DOMElement(this.visitedCard.node, {
      tagName: 'div',
      classList: ['interested__card_poster'],
    });
    this.visitedCardPosterImage = new ImageElement(this.visitedCardPoster.node, {
      tagName: 'img',
      classList: ['interested__card_img'],
      src: item.posterUrlPreview,
      alt: item.nameRu,
    });
  }
}
