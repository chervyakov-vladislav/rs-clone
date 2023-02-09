import { IFilmData, ITopFilm, KeyWordSearchInterface } from './response-data';

export interface StateInterface {
  premiere: IFilmData | null;
  films: ITopFilm[];
  best: ITopFilm[];
  player: Record<string, string>;
  iframe: HTMLElement;
  moviePage: {
    pageID: string;
    currentData: IFilmData | null;
  };
  previousPageInfo: PreviousPageInfoInterface;
  search: {
    searchKeyWord: KeyWordSearchInterface | null;
    searchKeywordValue: string;
    searchFilmsCountResult: number;
  }
}

export interface PreviousPageInfoInterface {
  currentPageHash?: string;
  currentPageID?: string;
  previousPageHash?: string;
  previousPageID?: string;
}
