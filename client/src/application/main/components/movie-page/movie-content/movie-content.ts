import './movie-content.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { IFilmData, IReview, IReviewsData } from '../../../../shared/models/response-data';
import UserReview from './user-review';

export default class MovieContent {
  private userReview: UserReview | null;

  private contentColumn1: DOMElement;

  private usersReviews: DOMElement;

  private usersReviewsTitle: DOMElement;

  private usersReviewsAdd: DOMElement;

  private usersReviewsContent: DOMElement;

  private usersReviewsReviews: DOMElement;

  private usersReviewsInfo: DOMElement;

  private usersReviewsTotal: DOMElement;

  private usersReviewsTotalP: DOMElement;

  private usersReviewsTotalS: DOMElement;

  private usersReviewsPositive: DOMElement;

  private usersReviewsPositiveP: DOMElement;

  private usersReviewsPositiveS: DOMElement;

  private usersReviewsNeutral: DOMElement;

  private usersReviewsNeutralP: DOMElement;

  private usersReviewsNeutralS: DOMElement;

  private usersReviewsNegative: DOMElement;

  private usersReviewsNegativeP: DOMElement;

  private usersReviewsNegativeS: DOMElement;

  private reviewsData: IReview[];

  constructor(container: HTMLElement, item: IFilmData, reviews: IReviewsData) {
    this.userReview = null;

    this.reviewsData = reviews.items.slice(0, 6);

    this.contentColumn1 = new DOMElement(container, {
      tagName: 'h3',
      classList: ['movie-content__column1'],
    });

    this.usersReviews = new DOMElement(this.contentColumn1.node, {
      tagName: 'div',
      classList: ['users-reviews'],
    });

    this.usersReviewsTitle = new DOMElement(this.usersReviews.node, {
      tagName: 'h3',
      classList: ['users-reviews__title'],
      content: 'Рецензии зрителей',
    });

    this.usersReviewsAdd = new ButtonElement(this.usersReviews.node, {
      tagName: 'button',
      classList: ['users-reviews__write-review-btn'],
      content: 'Написать рецензию',
    });

    this.usersReviewsContent = new DOMElement(this.usersReviews.node, {
      tagName: 'div',
      classList: ['users-reviews__content'],
    });

    this.usersReviewsReviews = new DOMElement(this.usersReviewsContent.node, {
      tagName: 'div',
      classList: ['users-reviews__reviews'],
    });

    this.usersReviewsInfo = new DOMElement(this.usersReviewsContent.node, {
      tagName: 'div',
      classList: ['users-reviews__info'],
    });

    this.usersReviewsTotal = new DOMElement(this.usersReviewsInfo.node, {
      tagName: 'div',
      classList: ['users-reviews__total', 'active'],
    });

    this.usersReviewsTotalP = new DOMElement(this.usersReviewsTotal.node, {
      tagName: 'p',
      classList: ['users-reviews__amount'],
      content: `${reviews.total}`,
    });

    this.usersReviewsTotalS = new DOMElement(this.usersReviewsTotal.node, {
      tagName: 'span',
      content: 'Всего',
    });

    this.usersReviewsPositive = new DOMElement(this.usersReviewsInfo.node, {
      tagName: 'div',
      classList: ['users-reviews__positive'],
    });

    this.usersReviewsPositiveP = new DOMElement(this.usersReviewsPositive.node, {
      tagName: 'p',
      classList: ['users-reviews__amount', 'positive'],
      content: `${reviews.totalPositiveReviews}`,
    });

    this.usersReviewsPositiveS = new DOMElement(this.usersReviewsPositive.node, {
      tagName: 'span',
      content: 'Положительные',
    });

    this.usersReviewsNeutral = new DOMElement(this.usersReviewsInfo.node, {
      tagName: 'div',
      classList: ['users-reviews__neutral'],
    });

    this.usersReviewsNeutralP = new DOMElement(this.usersReviewsNeutral.node, {
      tagName: 'p',
      classList: ['users-reviews__amount', 'neutral'],
      content: `${reviews.totalNeutralReviews}`,
    });

    this.usersReviewsNeutralS = new DOMElement(this.usersReviewsNeutral.node, {
      tagName: 'span',
      content: 'Нейтральные',
    });

    this.usersReviewsNegative = new DOMElement(this.usersReviewsInfo.node, {
      tagName: 'div',
      classList: ['users-reviews__negative'],
    });

    this.usersReviewsNegativeP = new DOMElement(this.usersReviewsNegative.node, {
      tagName: 'p',
      classList: ['users-reviews__amount', 'negative'],
      content: `${reviews.totalNegativeReviews}`,
    });

    this.usersReviewsNegativeS = new DOMElement(this.usersReviewsNegative.node, {
      tagName: 'span',
      content: 'Отрицательные',
    });

    this.renderUserReview();
  }

  public renderUserReview = () => {
    this.reviewsData.forEach((review: IReview) => {
      this.userReview = new UserReview(this.usersReviewsReviews.node, review);
    });
  };
}
