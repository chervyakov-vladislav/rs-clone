import apiKinopoisk from '../../../shared/services/api/api-kinopoisk';
import state from '../../../shared/services/state';
import suggestObserver from './suggest-observer.service';

class SearchService {
  public async headerSearch(value: string) {
    state.setSearchNextPage(1);
    const res = await apiKinopoisk.searchKeyword(value);
    state.setSearchKeyword(res);
    suggestObserver.render();
  }
}

const searchService = new SearchService();
export default searchService;
