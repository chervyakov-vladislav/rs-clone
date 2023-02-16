import { Countries, ITopFilm } from '../../../../shared/models/response-data';
import state from '../../../../shared/services/state';

class ValueCheck {
  public isNameRU(data: ITopFilm) {
    const isNameRu = data.nameRu ? data.nameRu : data.nameEn;
    const isName = isNameRu.length > 0 ? isNameRu : '-';
    return isName;
  }

  public getEngnameYearTotalTime(data: ITopFilm) {
    const result: string[] = [];
    if (data.nameEn) result.push(data.nameEn);
    console.log(data);
    if (data.year && data.year !== 'null') result.push(`${data.year} год`);
    if (data.filmLength) {
      const time = this.analyzeTime(data.filmLength);
      result.push(time);
    }
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

  public getTypeCountry(data: ITopFilm) {
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
      VIDEO: 'Видео',
    };
    return showType[value];
  }

  private analyzeCountries(countries: Countries[]) {
    if (countries.length === 1) return countries[0].country;
    if (countries.length === 0) return '';
    const result = countries.map((item) => item.country);
    return result.join(', ');
  }

  public getGenres(data: ITopFilm) {
    if (data.genres.length === 1) return data.genres[0].genre;
    if (data.genres.length === 0) return '';
    const result = data.genres.map((item) => item.genre);
    return result.join(', ');
  }

  public getRating(data: ITopFilm) {
    if (Number.isNaN(data.rating)) return '0';
    return data.rating === 'null' ? '0' : data.rating;
  }

  public getListCount(count: number) {
    const currentPage = state.getSearchNextPage();
    if (currentPage === 1) return count.toString();
    return `${(currentPage - 1) * 20 + count}`;
  }
}

const valueCheck = new ValueCheck();
export default valueCheck;
