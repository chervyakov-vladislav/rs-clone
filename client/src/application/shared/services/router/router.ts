import DOMElement from '../../components/base-elements/dom-element';
import { RouterOptions } from '../../models/router-options';
import state from '../state';
import mainRoutes from './routes';

export default class Router extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['router-container'],
    });
    this.enableRouteChange();
    const id = this.getCurrentPageId();
    this.renderNewPage(id);
  }

  public renderNewPage(pageID: string) {
    this.node.innerHTML = '';
    const element = this.findNewtemplate(pageID); // movie
    const newPage = element.length !== 0 ? element[0].template().node : mainRoutes[0].template().node;
    // тут написать, если pageID, это страница какого-то одного фильма, то загрузить новый фильм в стейт страницы и только потом её рисовать
    // можно испольвовать конструкцию switch, как в online-store: https://github.com/chervyakov-vladislav/online-store/blob/main/src/application/main/router/router.ts
    this.node.append(newPage);
  }

  private findNewtemplate(pageID: string): RouterOptions[] {
    return mainRoutes.filter((route) => route.id === pageID);
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', async () => {
      const id = this.getCurrentPageId();
      if (id === 'movie') {
        await this.setMoviePage(window.location.hash);
      }
      this.renderNewPage(id);
    });
  }

  private getPageID(path: string) {
    return path.split('/')[1];
  }

  private async setMoviePage(pageID: string) {
    const filmID = this.getPageID(pageID);
    state.setMoviePageID(filmID);
    await state.setMoviePageCurrentData();
    console.log(state.allData.moviePage.currentData);
  }

  private getCurrentPageId() {
    const { hash } = window.location;
    const id = hash.slice(1).split('/')[0];
    this.setPrevPage(hash, id);
    return id;
  }

  private setPrevPage(hash: string, id: string) {
    const prevData = state.getPreviousPageInfo();
    state.setPreviousPageInfo({
      previousPageHash: prevData.currentPageHash,
      previousPageID: prevData.currentPageID,
      currentPageHash: hash,
      currentPageID: id,
    });
  }
}
