import { Countries, ExtendedSearchResultItem } from '../../../../shared/models/response-data';
import state from '../../../../shared/services/state';

class ExtendedValueCheck {
  public isNameRU(data: ExtendedSearchResultItem) {
    const isNameRu = data.nameRu === null ? data.nameEn : data.nameRu;
    const isNameEn = isNameRu === null ? data.nameOriginal : isNameRu;
    const isName = isNameEn === null ? '-' : isNameEn;
    return isName;
  }

  public getEngnameYearTotalTime(data: ExtendedSearchResultItem) {
    const result: string[] = [];
    if (data.nameEn) result.push(data.nameEn);
    if (data.year) result.push(`${data.year} год`);
    if (result.length === 1) {
      return result[0];
    }
    return result.length > 1 ? result.join(', ') : '';
  }

  private analyzeTime(value: string) {
    const [hours, mins] = value.split(':');
    const numHours = parseInt(hours, 10);
    const numMins = parseInt(mins, 10);
    return numHours > 0 ? `${numHours} ч. ${numMins} мин.` : `${numMins} мин.`;
  }

  public getTypeCountry(data: ExtendedSearchResultItem) {
    const result: string[] = [];
    if (data.type) {
      const type = this.analyzeType(data.type);
      result.push(type);
    }
    if (data.countries) {
      const countries = this.analyzeCountries(data.countries);
      result.push(countries);
    }
    return result.length > 0 ? result.join(', ') : '';
  }

  private analyzeType(value: string) {
    const showType: Record<string, string> = {
      FILM: 'Фильм',
      TV_SHOW: 'Тв-шоу',
      TV_SERIES: 'Cериал',
      MINI_SERIES: 'Мини-сериал',
    };
    return showType[value];
  }

  private analyzeCountries(countries: Countries[]) {
    if (countries.length === 1) return countries[0].country;
    if (countries.length === 0) return '';
    const result = countries.map((item) => item.country);
    return result.join(', ');
  }

  public getGenres(data: ExtendedSearchResultItem) {
    if (data.genres.length === 1) return data.genres[0].genre;
    if (data.genres.length === 0) return '';
    const result = data.genres.map((item) => item.genre);
    return result.join(', ');
  }

  public getRating(data: ExtendedSearchResultItem) {
    return data.ratingKinopoisk ? data.ratingKinopoisk : '-';
  }

  public getListCount(count: number) {
    const currentPage = state.getSearchNextPage();
    if (currentPage === 1) return count.toString();
    return `${(currentPage - 1) * 20 + count}`;
  }
}

const extendedValueCheck = new ExtendedValueCheck();
export default extendedValueCheck;
