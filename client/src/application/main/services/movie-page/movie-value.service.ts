import { IFilmData, IStaff } from '../../../shared/models/response-data';

class MovieValue {
  public isNameRU(data: IFilmData) {
    const name = data.nameRu === null ? data.nameOriginal : data.nameRu;
    return name === null ? '-' : name;
  }

  public getCountry(data: IFilmData) {
    if (data.countries.length === 1) return data.countries[0].country;
    if (data.countries.length === 0) return '';
    const result = data.countries.map((item) => item.country);
    return result.join(', ');
  }

  public getGenres(data: IFilmData) {
    if (data.genres.length === 1) return data.genres[0].genre;
    if (data.genres.length === 0) return '';
    const result = data.genres.map((item) => item.genre);
    return result.join(', ');
  }

  public getYear(data: IFilmData) {
    return data.year === null ? '-' : data.year;
  }

  public getRating(data: IFilmData) {
    return data.ratingKinopoisk === null ? 0 : data.ratingKinopoisk;
  }

  public getDescription(data: IFilmData) {
    return data.description === null ? '-' : data.description;
  }

  public getRatingImdb(data: IFilmData) {
    return data.ratingImdb === null ? 0 : data.ratingImdb;
  }

  public getStaff(data: IStaff[], prof: string) {
    const staff = data
      .filter((item) => item.professionKey === prof)
      .map((item) => {
        return item.nameRu;
      });
    if (staff.length === 0) return '';
    if (staff.length === 1) return staff[0];
    return staff.join(', ');
  }

  public getTime(data: IFilmData) {
    const totalMinutes = +data.filmLength;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours} ч. ${minutes} мин.` : `${minutes} мин.`;
  }

  public getRatingStyle(data: IFilmData) {
    const rating = +data.ratingKinopoisk < 7 ? ['movie-info__rating'] : ['movie-info__rating', 'positive'];
    return rating;
  }

  public declOfNum(n: number, titles: string[]) {
    if (n % 10 === 1 && n % 100 !== 11) {
      return titles[0];
    }
    return titles[n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  }

  public convertDate(date: string) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const hours = date.slice(11, 13);
    const min = date.slice(14, 16);
    return `${day}-${month}-${year} в ${hours}:${min}`;
  }

  public getReviewType(type: string) {
    if (!type) throw new Error();
    return type.toLowerCase();
  }

  public getReviewTitle(type: string) {
    if (!type) {
      return '';
    }
    return type;
  }

  public getReviewAuthor(type: string) {
    return type === null ? '-' : type;
  }

  public getReviewDescription(type: string) {
    return type === null ? '-' : type;
  }
}

const movieValue = new MovieValue();
export default movieValue;
