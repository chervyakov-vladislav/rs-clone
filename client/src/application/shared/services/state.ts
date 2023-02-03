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
    };
  }

  public async showPremiereData(id = 301) {
    const data = await apiKinopoisk.getFilmData(id);
    this.allData.premiere.coverUrl = data.coverUrl;
    this.allData.premiere.nameRu = data.nameRu;
    this.allData.premiere.description = data.description;
    console.log(this.allData.premiere.nameRu);
  }
}

const state = new State();
export default state;
