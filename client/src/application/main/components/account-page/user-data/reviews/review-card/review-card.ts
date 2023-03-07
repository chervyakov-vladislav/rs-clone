import './review-card.scss';
import DOMElement from '../../../../../../shared/components/base-elements/dom-element';
import { IReviewBackend } from '../../../../../../shared/models/response-data';
import reviewCheck from '../../../../../services/account-page/user-reviews/review-value-check.service';

export default class ReviewCard extends DOMElement {
  private title: DOMElement;

  private date: DOMElement;

  private text: DOMElement;

  constructor(parentNode: HTMLElement, data: IReviewBackend) {
    super(parentNode, {
      tagName: 'li',
      classList: reviewCheck.checkType(data),
    });
    this.node.addEventListener('click', () => {
      window.location.hash = `#movie/${data.filmID}`;
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h3',
      classList: ['review-card__name'],
      content: data.title,
    });

    this.date = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['review-card__date'],
      content: reviewCheck.formatData(data),
    });

    this.text = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['review-card__text'],
      content: data.description,
    });
  }
}
