import apiKinopoisk from '../../../shared/services/api/api-kinopoisk';

class SearchService {
  public async headerSearch(value: string) {
    const res = await apiKinopoisk.searchKeyword(value);
    console.log(res);
  }
}

const searchService = new SearchService();
export default searchService;
