import '../card/card.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import LinkElement from '../../../../shared/components/base-elements/link-element';
import SVG from '../../../../shared/components/svg-icons';
import { ExtendedSearchResultItem } from '../../../../shared/models/response-data';
import extendedValueCheck from '../../../services/extended-search-page/value-check/value-check';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import storage from '../../../../shared/components/local-storage';

export default class SearchExtendedCard extends DOMElement {
  private link: LinkElement;

  private count: DOMElement;

  private image: ImageElement;

  private info: DOMElement;

  private desc: DOMElement;

  private title: DOMElement;

  private buttons: DOMElement;

  private firstRowInfo: DOMElement;

  private secondRowInfo: DOMElement;

  private thirdRowInfo: DOMElement;

  private ratingContainer: DOMElement;

  private rating: DOMElement;

  private leftBranch: DOMElement;

  private rightBranch: DOMElement;

  private accountButtons: DOMElement;

  private lookLaterBtn: ButtonElement;

  private likeButton: ButtonElement;

  constructor(parentNode: HTMLElement, data: ExtendedSearchResultItem, count: number) {
    super(parentNode, {
      tagName: 'li',
      classList: ['search-card'],
    });

    this.link = new LinkElement(this.node, {
      tagName: 'a',
      classList: ['search-card__link'],
      href: `#movie/${data.kinopoiskId}`,
    });
    this.link.node.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLLinkElement;
      if (target !== this.lookLaterBtn.node && !target.closest('.search-card__account-button-like')) {
        window.location.hash = `#movie/${data.kinopoiskId}`;
        const movie = { filmId: data.kinopoiskId, posterUrlPreview: data.posterUrlPreview, nameRu: data.nameRu };
        storage.putMovies(movie);
      }
    });

    this.count = new DOMElement(this.link.node, {
      tagName: 'span',
      classList: ['search-card__count'],
      content: extendedValueCheck.getListCount(count),
    });

    this.image = new ImageElement(this.link.node, {
      tagName: 'img',
      classList: ['search-card__image'],
      src: data.posterUrlPreview,
    });

    this.info = new DOMElement(this.link.node, {
      tagName: 'div',
      classList: ['search-card__info'],
    });

    this.desc = new DOMElement(this.info.node, {
      tagName: 'div',
      classList: ['search-card__desc'],
    });

    this.title = new DOMElement(this.desc.node, {
      tagName: 'h3',
      classList: ['search-card__film-title'],
      content: extendedValueCheck.isNameRU(data),
    });

    this.firstRowInfo = new DOMElement(this.desc.node, {
      tagName: 'p',
      classList: ['search-card__year-time'],
      content: extendedValueCheck.getEngnameYearTotalTime(data),
    });

    this.secondRowInfo = new DOMElement(this.desc.node, {
      tagName: 'p',
      classList: ['search-card__type-country'],
      content: extendedValueCheck.getTypeCountry(data),
    });

    this.thirdRowInfo = new DOMElement(this.desc.node, {
      tagName: 'p',
      classList: ['search-card__genres'],
      content: extendedValueCheck.getGenres(data),
    });

    this.buttons = new DOMElement(this.info.node, {
      tagName: 'div',
      classList: ['search-card__buttons'],
    });

    this.ratingContainer = new DOMElement(this.buttons.node, {
      tagName: 'div',
      classList: ['search-card__rating-container'],
    });

    this.leftBranch = new DOMElement(this.ratingContainer.node, {
      tagName: 'div',
      classList: ['search-card__left-branch'],
    });
    this.leftBranch.node.innerHTML = SVG.leftGoldBranch;

    this.rating = new DOMElement(this.ratingContainer.node, {
      tagName: 'div',
      classList: ['search-card__rating'],
      content: extendedValueCheck.getRating(data).toString(),
    });

    this.rightBranch = new DOMElement(this.ratingContainer.node, {
      tagName: 'div',
      classList: ['search-card__right-branch'],
    });
    this.rightBranch.node.innerHTML = SVG.rightGoldBranch;

    this.accountButtons = new DOMElement(this.buttons.node, {
      tagName: 'div',
      classList: ['search-card__account-buttons'],
    });

    this.lookLaterBtn = new ButtonElement(this.accountButtons.node, {
      tagName: 'button',
      classList: ['search-card__account-button-later'],
      content: 'Буду смотреть',
    });

    this.likeButton = new ButtonElement(this.accountButtons.node, {
      tagName: 'div',
      classList: ['search-card__account-button-like'],
    });
    this.likeButton.node.innerHTML = SVG.starRating;
  }
}
