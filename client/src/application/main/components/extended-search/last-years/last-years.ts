import './last-years.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import state from '../../../../shared/services/state';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import extendedRenderCards from '../../../services/extended-search-page/list-render/extended-render.service';

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
      extendedRenderCards.renderSearchFilms();
    });

    this.prevYearButton1 = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year - 1}`,
    });
    this.prevYearButton1.node.addEventListener('click', async () => {
      state.setSearchNextPage(1);
      const newState = await apiKinopoisk.searchByYear(`${year - 1}`);
      state.setSearchStatus('search');
      state.setSearchExtendedResult(newState);
      state.setSearchMaxPages(newState.totalPages);
      state.setSearchFilmsCountResult(newState.total);
      extendedRenderCards.renderSearchFilms();
    });

    this.prevYearButton2 = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year - 2}`,
    });
    this.prevYearButton2.node.addEventListener('click', async () => {
      state.setSearchNextPage(1);
      const newState = await apiKinopoisk.searchByYear(`${year - 2}`);
      state.setSearchStatus('search');
      state.setSearchExtendedResult(newState);
      state.setSearchMaxPages(newState.totalPages);
      state.setSearchFilmsCountResult(newState.total);
      extendedRenderCards.renderSearchFilms();
    });

    this.prevYearButton3 = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['last-year-films__button'],
      content: `${year - 3}`,
    });
    this.prevYearButton3.node.addEventListener('click', async () => {
      state.setSearchNextPage(1);
      const newState = await apiKinopoisk.searchByYear(`${year - 3}`);
      state.setSearchStatus('search');
      state.setSearchExtendedResult(newState);
      state.setSearchMaxPages(newState.totalPages);
      state.setSearchFilmsCountResult(newState.total);
      extendedRenderCards.renderSearchFilms();
    });
  }
}
