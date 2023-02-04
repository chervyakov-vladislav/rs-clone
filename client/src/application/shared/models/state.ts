import { IFilmData, ITopFilm } from './response-data';

export interface StateInterface {
  premiere: IFilmData;
}

export interface StateTopInterface {
  films: ITopFilm[];
}
