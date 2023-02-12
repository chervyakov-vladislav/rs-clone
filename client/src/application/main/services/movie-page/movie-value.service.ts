import { IFilmData, IStaff, ITopFilm } from '../../../shared/models/response-data';
// import state from '../../../shared/services/state';

class MovieValue {
  public isNameRU(data: ITopFilm) {
    const isNameRu = data.nameRu ? data.nameRu : data.nameEn;
    const isName = isNameRu.length > 0 ? isNameRu : '-';
    return isName;
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

  public getRating(data: IFilmData) {
    return data.ratingKinopoisk === null ? 0 : data.ratingKinopoisk;
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
}

const movieValue = new MovieValue();
export default movieValue;