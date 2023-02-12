import './last-years.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import state from '../../../../shared/services/state';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';

export default class LastYearFilms extends DOMElement {
  private currentYearButton: ButtonElement;

  private prevYearButton1: ButtonElement;

  private prevYearButton2: ButtonElement;

  private prevYearButton3: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['last-year-films'],
    });

    const year = new Date().getFullYear();

    this.currentYearButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year}`,
    });
    this.currentYearButton.node.addEventListener('click', async () => {
      state.setSearchNextPage(1);
      const newState = await apiKinopoisk.searchByYear(`${year}`);
      state.setSearchStatus('search');
      state.setSearchExtendedResult(newState);
      state.setSearchMaxPages(newState.totalPages);
      state.setSearchFilmsCountResult(newState.total);
      console.log(newState);
    });

    this.prevYearButton1 = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year - 1}`,
    });

    this.prevYearButton2 = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year - 2}`,
    });

    this.prevYearButton3 = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year - 3}`,
    });
  }
}
