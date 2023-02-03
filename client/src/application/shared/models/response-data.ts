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
