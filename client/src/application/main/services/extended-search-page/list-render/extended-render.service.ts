import state from '../../../../shared/services/state';
import SearchListCard from '../../../components/common/card/card';
import extendedInfiniteScroll from '../infinite-scroll/infitine-scroll';

class ExtenedRenderCards {
  private container: HTMLElement | null = null;

  public setContainer(elem: HTMLElement) {
    this.container = elem;
  }

  public render() {
    const data = state.getSearchResult().films;
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    if (data.length > 0) {
      data.forEach((item, index) => new SearchListCard(container, item, index + 1));
    }
  }

  public append() {
    const data = state.getSearchResult().films;
    const container = this.container as HTMLElement;
    if (data.length > 0) {
      data.forEach((item, index) => new SearchListCard(container, item, index + 1));
    }
  }

  public renderTopFilms() {
    const films = state.getSearchTopResult();
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    if (films.length > 0) {
      films.forEach((item, index) => new SearchListCard(container, item, index + 1));
      this.addEventListeners();
    }
  }

  private addEventListeners() {
    const func = extendedInfiniteScroll.scrollListener.bind(extendedInfiniteScroll);
    window.addEventListener('scroll', () => {
      const { currentPageID } = state.getPreviousPageInfo();
      if (currentPageID === 's') func();
    });
    window.addEventListener('resize', () => {
      const { currentPageID } = state.getPreviousPageInfo();
      if (currentPageID === 's') func();
    });
  }
}

const extendedRenderCards = new ExtenedRenderCards();
export default extendedRenderCards;
