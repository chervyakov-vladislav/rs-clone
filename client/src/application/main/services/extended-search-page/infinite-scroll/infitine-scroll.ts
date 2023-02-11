import apiHelpers from '../../../../shared/services/api/api-helpers.service';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import state from '../../../../shared/services/state';
import extendedRenderCards from '../list-render/extended-render.service';

class InfiniteScroll {
  public checkPosition() {
    const height = document.body.scrollHeight;
    const screenHeight = window.innerHeight;

    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 3;
    const position = scrolled + screenHeight;

    if (position >= threshold) {
      apiHelpers.throttle(this.createNewCards)();
    }
  }

  public scrollListener() {
    this.checkPosition();
  }

  private async createNewCards() {
    state.setSearchNextPage();
    const page = state.getSearchNextPage();
    if (page <= state.getSearchMaxPages()) {
      // переписать apiKinopoisk.searchKeyword(state.getSearchKeywordValue(), page); на расширенный поиск с новыми параметрами
      const newState = await apiKinopoisk.searchKeyword(state.getSearchKeywordValue(), page);
      state.setSearchResult(newState);
      extendedRenderCards.append();
    }
  }
}

const extendedInfiniteScroll = new InfiniteScroll();
export default extendedInfiniteScroll;
