import { IFilmData, ITopFilm } from './response-data';

export interface StateInterface {
  premiere: IFilmData | null;
  films: ITopFilm[];
  player: Record<string, string>;
  iframe: HTMLElement;
}
