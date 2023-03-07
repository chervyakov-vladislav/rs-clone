import './movie-content.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { IReview } from '../../../../shared/models/response-data';
import movieValue from '../../../services/movie-page/movie-value.service';
import ButtonElement from '../../../../shared/components/base-elements/button-element';

export default class UserReview extends DOMElement {
  private userReviewHeader: DOMElement;

  private userReviewUsername: DOMElement;

  private userReviewDate: DOMElement;

  private userReviewMain: DOMElement;

  private userReviewTitle: DOMElement;

  private userReviewText: DOMElement;

  private userReviewButton: ButtonElement;

  constructor(container: HTMLElement | null, review: IReview) {
    super(container, {
      tagName: 'div',
      classList: ['user-review', `${movieValue.getReviewType(review.type)}`],
    });

    this.userReviewHeader = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['user-review__header'],
    });

    this.userReviewUsername = new DOMElement(this.userReviewHeader.node, {
      tagName: 'p',
      classList: ['user-review__username'],
      content: `${movieValue.getReviewAuthor(review.author)}`,
    });

    this.userReviewDate = new DOMElement(this.userReviewHeader.node, {
      tagName: 'p',
      classList: ['user-review__date'],
      content: `${movieValue.convertDate(review.date)}`,
    });

    this.userReviewMain = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['user-review__main'],
    });

    this.userReviewTitle = new DOMElement(this.userReviewMain.node, {
      tagName: 'h4',
      classList: ['user-review__title'],
      content: `${movieValue.getReviewTitle(review.title)}`,
    });

    this.userReviewText = new DOMElement(this.userReviewMain.node, {
      tagName: 'p',
      classList: ['user-review__text'],
      content: `${movieValue.getReviewDescription(review.description)}`,
    });

    this.userReviewButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['user-review__show-btn'],
      content: 'показать всю рецензию',
    });

    this.userReviewButton.node.addEventListener('click', () => {
      this.userReviewText.node.classList.toggle('show-all');
    });
  }
}
