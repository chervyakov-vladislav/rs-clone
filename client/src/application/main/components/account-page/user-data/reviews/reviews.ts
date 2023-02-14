import './reviews.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';

export default class ReviewsFilms extends DOMElement {
  private title: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['reviews-films'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Мои рецензии',
      classList: ['reviews-films__title'],
    });
  }
}
