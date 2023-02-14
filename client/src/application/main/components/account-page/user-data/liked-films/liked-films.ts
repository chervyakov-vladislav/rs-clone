import './liked-films.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';

export default class LikedFilms extends DOMElement {
  private title: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['liked-films'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Вы оценили',
      classList: ['liked-films__title'],
    });
  }
}
