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
  countries: Countries[];
  description: string;
  coverUrl: string;
  filmLength: string;
  genres: [
    {
      genre: string;
    }
  ];
  nameEn: string;
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  shortDescription: string;
  type: string;
  link: string;
  year: number;
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

export interface IStaff {
  description: string;
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  professionKey: string;
  professionText: string;
  staffId: number;
}

export interface IStaffData {
  movieStaff: IStaff[];
}

export interface IReviewsData {
  items: IReview[];
  total: number;
  totalNegativeReviews: number;
  totalNeutralReviews: number;
  totalPages: number;
  totalPositiveReviews: number;
}

export interface IReview {
  author: string;
  date: string;
  description: string;
  kinopoiskId: number;
  negativeRating: number;
  positiveRating: number;
  title: string;
  type: string;
}

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

export interface SearchQuerryOptions {
  yearFrom: number;
  yearTo: number;
  keyword: string;
  genre: number;
  country: number;
}
