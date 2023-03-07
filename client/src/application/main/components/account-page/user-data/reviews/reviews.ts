import './reviews.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import userReviewsRenderService from '../../../../services/account-page/user-reviews/user-reviews-render.service';
import apiService from '../../../../../shared/services/api/server-api.service';
import state from '../../../../../shared/services/state';

export default class ReviewsFilms extends DOMElement {
  private title: DOMElement;

  private container: DOMElement;

  private remove: ButtonElement;

  private list: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['reviews-films'],
    });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['reviews-films__container'],
    });

    this.title = new DOMElement(this.container.node, {
      tagName: 'h2',
      content: 'Мои рецензии',
      classList: ['reviews-films__title'],
    });

    this.remove = new ButtonElement(this.container.node, {
      tagName: 'button',
      classList: ['reviews-films__remove'],
      content: 'Очистить список',
    });
    this.remove.node.addEventListener('click', () => {
      const login = state.getUserData().userLogin;
      apiService.deleteUserReviews(login);
      state.resetReviews();
      this.node.remove();
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['reviews-films__list'],
    });
    userReviewsRenderService.registerContainer(this.list.node);
    userReviewsRenderService.renderReviews();
  }
}
