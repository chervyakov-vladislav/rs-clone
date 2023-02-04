import { IFilmData, ITopFilm } from './response-data';

export interface StateInterface {
  premiere: IFilmData;
  films: ITopFilm[];
}
