import { IFilmData } from './response-data';

export interface StateInterface {
  premiere: IFilmData | null;
  player: Record<string, string>;
  iframe: HTMLElement;
}
