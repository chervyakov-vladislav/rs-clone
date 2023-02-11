import './top-films.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import state from '../../../../shared/services/state';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import extendedRenderCards from '../../../services/extended-search-page/list-render/extended-render.service';

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
    this.bestButton.node.addEventListener('click', async () => {
      state.setSearchNextPage(1);
      const newState = await apiKinopoisk.searchTopFilms('TOP_250_BEST_FILMS');
      state.setSearchTopStatus('TOP_250_BEST_FILMS');
      state.setSearchStatus('top');
      state.setSearchTopResult(newState);
      state.setSearchMaxPages(newState.pagesCount);
      extendedRenderCards.renderTopFilms();
    });

    this.popularButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['extended-top-films__button'],
      content: 'Популярные фильмы',
    });
    this.popularButton.node.addEventListener('click', async () => {
      state.setSearchNextPage(1);
      const newState = await apiKinopoisk.searchTopFilms('TOP_100_POPULAR_FILMS');
      state.setSearchTopStatus('TOP_100_POPULAR_FILMS');
      state.setSearchStatus('top');
      state.setSearchTopResult(newState);
      state.setSearchMaxPages(newState.pagesCount);
      extendedRenderCards.renderTopFilms();
    });

    this.awaitButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['extended-top-films__button'],
      content: 'Ожидаемые фильмы',
    });
    this.awaitButton.node.addEventListener('click', async () => {
      state.setSearchNextPage(1);
      const newState = await apiKinopoisk.searchTopFilms('TOP_AWAIT_FILMS');
      state.setSearchTopStatus('TOP_AWAIT_FILMS');
      state.setSearchStatus('top');
      state.setSearchTopResult(newState);
      state.setSearchMaxPages(newState.pagesCount);
      extendedRenderCards.renderTopFilms();
    });
  }
}
