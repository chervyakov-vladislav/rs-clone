// import { StateInterface } from '../models/state';
import apiKinopoisk from './api/api-kinopoisk';

class State {
  public allData;
  // public data: Interface; описать интерфейс

  constructor() {
    this.allData = {
      premiere: {
        link: 'https://youtu.be/d9MyW72ELq0',
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

  public getPremiereInfo() {
    return this.allData.premiere;
  }

  public async showPremiereData(id = 301) {
    const data = await apiKinopoisk.getFilmData(id);
    this.allData.premiere.coverUrl = data.coverUrl;
    this.allData.premiere.nameRu = data.nameRu;
    this.allData.premiere.description = data.description;
  }
}

const state = new State();
export default state;
