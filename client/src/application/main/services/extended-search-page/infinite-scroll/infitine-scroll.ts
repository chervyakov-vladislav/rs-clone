import apiHelpers from '../../../../shared/services/api/api-helpers.service';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import state from '../../../../shared/services/state';
import SearchListCard from '../../../components/common/card/card';

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
    const container = document.querySelector('.extended-search-list') as HTMLElement;
    if (page <= state.getSearchMaxPages()) {
      // переписать apiKinopoisk.searchKeyword(state.getSearchKeywordValue(), page); на расширенный поиск с новыми параметрами
      const status = state.getSearchStatus();
      if (status === 'search') {
        // какой-то новый запрос на поиск
        const newState = await apiKinopoisk.searchKeyword(state.getSearchKeywordValue(), page);
        state.setSearchResult(newState);
      } else {
        const topStatus = state.getSearchTopStatus();
        const newState = await apiKinopoisk.searchTopFilms(topStatus, page);
        if (newState.films.length > 0) {
          newState.films.forEach((item, index) => new SearchListCard(container, item, index + 1));
        }
      }
    }
  }
}

const extendedInfiniteScroll = new InfiniteScroll();
export default extendedInfiniteScroll;
