import './recomend.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import SVG from '../../../../shared/components/svg-icons';
import LinkElement from '../../../../shared/components/base-elements/link-element';
import state from '../../../../shared/services/state';
import ImageElement from '../../../../shared/components/base-elements/image-element';

export default class RecomendSection extends DOMElement {
  private recomendTitle: DOMElement;

  private recomendLink: DOMElement;

  private recomendPic: DOMElement;

  private recomendCardsList: DOMElement;

  private recomendCard: DOMElement;

  private recomendCardLink: DOMElement;

  private recomendCardPoster: DOMElement;

  private recomendCardPosterImage: ImageElement;

  private recomendCardTitle: DOMElement;

  private recomendCardInfo: DOMElement;

  private recomendCardYear: DOMElement;

  private recomendCardGenre: DOMElement;

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
      href: '#',
      classList: ['recomend__title_link'],
      content: 'Рекомендации',
    });

    this.recomendPic = new DOMElement(this.recomendTitle.node, {
      tagName: 'span',
      classList: ['recomend__pic'],
    });
    this.recomendPic.node.innerHTML = SVG.recomendArrow;

    this.recomendTitle.node.addEventListener('click', () => {
      console.log(state.allData.films[1].posterUrlPreview);
      window.location.hash = '#premiere';
    });

    this.recomendCardsList = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['recomend__cards_list'],
    });

    this.recomendCard = new DOMElement(this.recomendCardsList.node, {
      tagName: 'div',
      classList: ['recomend__card'],
    });

    this.recomendCardLink = new LinkElement(this.recomendCard.node, {
      tagName: 'a',
      href: '#',
      classList: ['recomend__card_link'],
      content: '',
    });

    this.recomendCard.node.addEventListener('click', () => {
      window.location.hash = `#movie/${state.allData.films[0].filmId}`;
    });

    this.recomendCardPoster = new DOMElement(this.recomendCard.node, {
      tagName: 'div',
      classList: ['recomend__card_poster'],
    });

    this.recomendCardPosterImage = new ImageElement(this.recomendCardPoster.node, {
      tagName: 'img',
      classList: ['recomend__card_img'],
      src: state.allData.films[0].posterUrlPreview,
      alt: state.allData.films[0].nameRu,
    });

    this.recomendCardTitle = new DOMElement(this.recomendCard.node, {
      tagName: 'p',
      classList: ['recomend__card_title'],
      content: state.allData.films[0].nameRu,
    });

    this.recomendCardInfo = new DOMElement(this.recomendCard.node, {
      tagName: 'div',
      classList: ['recomend__card_info'],
    });

    this.recomendCardYear = new DOMElement(this.recomendCardInfo.node, {
      tagName: 'p',
      classList: ['recomend__card_year'],
      content: state.allData.films[0].year,
    });

    this.recomendCardGenre = new DOMElement(this.recomendCardInfo.node, {
      tagName: 'p',
      classList: ['recomend__card_year'],
      content: state.allData.films[0].genres[0].genre,
    });
  }
}
