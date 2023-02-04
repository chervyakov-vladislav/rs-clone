import { StateInterface } from '../models/state';
import apiKinopoisk from './api/api-kinopoisk';

class State {
  public allData: StateInterface;

  constructor() {
    this.allData = {
      premiere: null,
      player: {
        status: 'paused',
      },
      iframe: document.createElement('div'),
    };
  }

  public getPremiereInfo() {
    return this.allData.premiere;
  }

  public async loadAppData() {
    // грузим данные для обложки
    const premiereID = 301; // пока вынесем нужный ID в константу
    const premiereLink = 'https://youtu.be/8qB8EGNOtr8';
    this.allData.premiere = await apiKinopoisk.getFilmData(premiereID);
    this.allData.premiere.link = premiereLink;

    // грузим данные для следующего компонента
  }

  public getPlayerState() {
    return this.allData.player;
  }

  public setPlayerState(options: Record<string, string>) {
    const keyArr = Object.keys(options);
    keyArr.forEach((key) => {
      this.allData.player[key] = options[key];
    });
  }

  public getIframe() {
    return this.allData.iframe;
  }

  public setIframe(elem: HTMLElement) {
    this.allData.iframe = elem;
  }

  public setTotalTime(time: number) {
    const totalTime = this.formatDurtion(time);
    this.setPlayerState({
      totalTime,
    });
  }

  public setCurrentTime(time: number) {
    const currentTime = this.formatDurtion(time);
    this.setPlayerState({
      currentTime,
    });
  }

  private formatDurtion(time: number) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    if (minutes === 0 && seconds < 10) {
      return `0:0${seconds}`;
    }
    if (minutes === 0) {
      return `0:${seconds}`;
    }
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
}

const state = new State();
export default state;
