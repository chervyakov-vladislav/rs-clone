import { StateInterface } from '../models/state';
import apiKinopoisk from './api/api-kinopoisk';

class State {
  public allData: StateInterface;

  constructor() {
    this.allData = {
      premiere: {
        coverUrl: '',
        posterUrl: '',
        posterUrlPreview: '',
        description: '',
        shortDescription: '',
        nameOriginal: '',
        nameRu: '',
        year: '',
      },
      films: [],
    };
  }

  public async loadAppData(id = 301) {
    const data = await apiKinopoisk.getFilmData(id);
    this.allData.premiere.coverUrl = data.coverUrl;
    this.allData.premiere.posterUrl = data.posterUrl;
    this.allData.premiere.posterUrlPreview = data.posterUrlPreview;
    this.allData.premiere.description = data.description;
    this.allData.premiere.shortDescription = data.shortDescription;
    this.allData.premiere.nameOriginal = data.nameOriginal;
    this.allData.premiere.nameRu = data.nameRu;
    this.allData.premiere.year = data.year;

    // Получаем массив данных рекомендованных фильмов
    const dataTop = await apiKinopoisk.getTopData();
    this.allData.films = dataTop.films;
  }
}

const state = new State();
export default state;
