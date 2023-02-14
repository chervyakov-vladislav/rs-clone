import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { IFilmData, IReviewsData } from '../../../../shared/models/response-data';
import './movie-content.scss';

export default class MovieContent {
  private contentColumn1: DOMElement;

  private usersReviews: DOMElement;

  private usersReviewsTitle: DOMElement;

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

  constructor(container: HTMLElement, item: IFilmData, rewiews: IReviewsData) {
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
      content: `${rewiews.total}`,
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
      content: `${rewiews.totalPositiveReviews}`,
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
      content: `${rewiews.totalNeutralReviews}`,
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
      content: `${rewiews.totalNegativeReviews}`,
    });

    this.usersReviewsNegativeS = new DOMElement(this.usersReviewsNegative.node, {
      tagName: 'span',
      content: 'Отрицательные',
    });
  }
}
