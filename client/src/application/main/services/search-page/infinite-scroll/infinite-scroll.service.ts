import apiHelpers from '../../../../shared/services/api/api-helpers.service';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import state from '../../../../shared/services/state';
import renderCards from '../render-cards/render-card.service';

class InfiniteScroll {
  public checkPosition() {
    const height = document.body.scrollHeight;
    const screenHeight = window.innerHeight;

    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 3;
    const position = scrolled + screenHeight;

    if (position >= threshold) {
      apiHelpers.throttle(async () => {
        state.setSearchNextPage();
        const page = state.getSearchNextPage();
        if (page <= state.getSearchMaxPages()) {
          const newState = await apiKinopoisk.searchKeyword(state.getSearchKeywordValue(), page);
          state.setSearchKeyword(newState);
          renderCards.append();
        }
      })();
    }
  }

  public scrollListener() {
    this.checkPosition();
  }
}

const infiniteScroll = new InfiniteScroll();
export default infiniteScroll;
