import './top-films.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';

export default class TopFilms extends DOMElement {
  private bestButton: ButtonElement;

  private popularButton: ButtonElement;

  private awaitButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['extended-top-films'],
    });

    this.bestButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['extended-top-films__button'],
      content: 'Лучшие фильмы',
    });

    this.popularButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['extended-top-films__button'],
      content: 'Популярные фильмы',
    });

    this.awaitButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['extended-top-films__button'],
      content: 'Ожидаемые фильмы',
    });
    // каждое нажатие на кнопку должна обнулять state.setSearchNextPage(1);
  }
}
