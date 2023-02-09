export interface CarInterface {
  id?: number;
  name: string;
  color: string;
}

export interface EngineData {
  distance: number;
  velocity: number;
}

export interface WinnerInterface {
  id: number;
  time: number;
  wins: number;
}

export interface IFilmData {
  [key: string]: string | null | boolean;
}

export interface ITopData {
  films: ITopFilm[];
}

export interface ITopFilm {
  filmId: number;
  genres: [
    {
      genre: string;
    }
  ];
  nameRu: string;
  nameEn: string;
  posterUrl: string;
  posterUrlPreview: string;
  rating: string;
  year: string;
}

export type ObjectLocalStorage = {
  filmId: number;
  posterUrlPreview: string;
  nameRu: string;
};

export interface KeyWordSearchInterface {
  films: ITopFilm[];
  keyword: string;
  pageCount: number;
  searchFilmsCountResult: number;
}

export interface searchOptions {
  order?: 'RATING' | 'NUM_VOTE' | 'YEAR';
  type?: 'ALL' | 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIES';
  ratingFrom?: number;
  ratingTo?: number;
  yearFrom?: number;
  yearTo?: number;
  keyword?: string;
  page?: number;
}
