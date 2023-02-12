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
  pagesCount: number;
}

export interface ITopFilm {
  countries: Countries[];
  desctiption: string;
  filmId: number;
  filmLength: string;
  genres: Genres[];
  nameRu: string;
  nameEn: string;
  posterUrl: string;
  posterUrlPreview: string;
  rating: string;
  ratingVoteCount: number;
  year: string;
  type: string;
}

export interface Countries {
  country: string;
}

export interface Genres {
  genre: string;
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

export interface SearchOptions {
  order?: 'RATING' | 'NUM_VOTE' | 'YEAR';
  type?: 'ALL' | 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIES';
  ratingFrom?: number;
  ratingTo?: number;
  yearFrom?: number;
  yearTo?: number;
  keyword?: string;
  page?: number;
}

export interface ExtendedSearchResultInterface {
  items: ExtendedSearchResultItem[];
  total: number;
  totalPages: number;
}

export interface ExtendedSearchResultItem {
  countries: Countries[];
  genres: Genres[];
  imdbId: string;
  kinopoiskId: number;
  nameEn: string;
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingImdb: number;
  ratingKinopoisk: number;
  year: string;
  type: string;
}