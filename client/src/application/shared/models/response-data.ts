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
  coverUrl: string;
  posterUrl: string;
  posterUrlPreview: string;
  description: string;
  shortDescription: string;
  nameOriginal: string;
  nameRu: string;
  year: string;
}

export interface ITopData {
  films: ITopFilm[];
}

export interface ITopFilm {
  film: {
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
  };
}
