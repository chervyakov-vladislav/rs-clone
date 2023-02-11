import './last-years.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';

export default class LastYearFilms extends DOMElement {
  private bestButton: ButtonElement;

  private popularButton: ButtonElement;

  private awaitButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['last-year-films'],
    });

    const year = new Date().getFullYear();

    this.bestButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year}`,
    });

    this.popularButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year - 1}`,
    });

    this.awaitButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year - 2}`,
    });
  }
}
