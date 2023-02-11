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
  countries: [
    {
      country: string;
    }
  ];
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
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  shortDescription: string;
  type: string;
  link: string;
  year: number;
}

export interface ITopData {
  films: ITopFilm[];
}

export interface ITopFilm {
  countries: Countries[];
  desctiption: string;
  filmId: number;
  filmLength: string;
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
  type: string;
}

export interface Countries {
  country: string;
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
