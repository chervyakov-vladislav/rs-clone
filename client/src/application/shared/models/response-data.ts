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
  posterUrl: string;
  posterUrlPreview: string;
  rating: string;
  year: string;
}
