import './reviews.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import state from '../../../../../shared/services/state';

export default class ReviewsFilms extends DOMElement {
  private title: DOMElement;

  private container: DOMElement;

  private remove: ButtonElement;

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
      // запрос на бек, что бы очистить список
      // что-то очистить в стейте
      this.node.remove();
    });
  }
}
