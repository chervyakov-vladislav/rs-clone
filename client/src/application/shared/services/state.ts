import { KeyWordSearchInterface } from '../models/response-data';
import { PreviousPageInfoInterface, StateInterface } from '../models/state';
import apiKinopoisk from './api/api-kinopoisk';

class State {
  public allData: StateInterface;

  constructor() {
    this.allData = {
      premiere: null,
      player: {
        status: 'paused',
      },
      films: [],
      best: [],
      iframe: document.createElement('div'),
      moviePage: {
        pageID: '',
        currentData: null,
      },
      previousPageInfo: {
        currentPageHash: '',
        currentPageID: '',
        previousPageHash: '',
        previousPageID: '',
      },
      search: {
        searchResult: null,
        searchKeywordValue: '',
        searchFilmsCountResult: 0,
        searchMaxPages: 1,
        searchNextPage: 1,
      },
    };
  }

  public async loadAppData() {
    // грузим данные для обложки
    const premiereID = 301; // пока вынесем нужный ID в константу
    const premiereLink = 'https://youtu.be/8qB8EGNOtr8';
    this.allData.premiere = await apiKinopoisk.getFilmData(premiereID);
    this.allData.premiere.link = premiereLink;

    // Получаем массив данных рекомендованных фильмов
    const dataTop = await apiKinopoisk.getTopData();
    this.allData.films = dataTop.films;

    // Получаем массив данных лучших фильмов
    const dataBestTop = await apiKinopoisk.getTopBestData();
    this.allData.best = dataBestTop.films;
  }

  public getPremiereInfo() {
    return this.allData.premiere;
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
      totalSec: time.toString(),
    });
  }

  public setCurrentTime(time: number) {
    const currentTime = this.formatDurtion(time);
    this.setPlayerState({
      currentTime,
      currentTotalSec: time.toString(),
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

  public setMoviePageID(id: string) {
    this.allData.moviePage.pageID = id;
  }

  public getMoviePageID() {
    return this.allData.moviePage.pageID;
  }

  public async setMoviePageCurrentData() {
    const data = await apiKinopoisk.getFilmData(Number(this.getMoviePageID()));
    this.allData.moviePage.currentData = data;
  }

  public setPreviousPageInfo(options: PreviousPageInfoInterface) {
    this.allData.previousPageInfo.currentPageHash = options.currentPageHash;
    this.allData.previousPageInfo.currentPageID = options.currentPageID;
    this.allData.previousPageInfo.previousPageHash = options.previousPageHash;
    this.allData.previousPageInfo.previousPageID = options.previousPageID;
  }

  public getPreviousPageInfo() {
    return this.allData.previousPageInfo;
  }

  public setSearchResult(value: KeyWordSearchInterface) {
    this.allData.search.searchResult = value;
    this.allData.search.searchFilmsCountResult = value.searchFilmsCountResult;
    this.allData.search.searchMaxPages = Math.ceil(value.searchFilmsCountResult / 20);
  }

  public getSearchMaxPages() {
    return this.allData.search.searchMaxPages;
  }

  public getSearchNextPage() {
    return this.allData.search.searchNextPage;
  }

  public setSearchNextPage(value?: number) {
    this.allData.search.searchNextPage = value || this.allData.search.searchNextPage + 1;
  }

  public getSearchResult() {
    return this.allData.search.searchResult as KeyWordSearchInterface;
  }

  public setSearchKeywordValue(value: string) {
    this.allData.search.searchKeywordValue = value;
  }

  public getSearchKeywordValue() {
    return this.allData.search.searchKeywordValue;
  }
}

const state = new State();
export default state;
