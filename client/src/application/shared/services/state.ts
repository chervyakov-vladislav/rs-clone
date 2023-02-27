import userPhoto from '../../../assets/images/login.png';
import {
  ExtendedSearchResultInterface,
  IReview,
  IReviewBackend,
  ITopData,
  KeyWordSearchInterface,
} from '../models/response-data';
import { PreviousPageInfoInterface, StateInterface, UserDataParams, UsersList } from '../models/state';
import apiKinopoisk from './api/api-kinopoisk';
import apiService from './api/server-api.service';

class State {
  public allData: StateInterface;

  constructor() {
    this.allData = {
      premiere: null,
      movieData: null,
      movieStaff: [],
      movieReviews: {
        items: [],
        total: 0,
        totalNegativeReviews: 0,
        totalNeutralReviews: 0,
        totalPages: 0,
        totalPositiveReviews: 0,
      },
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
        searchTopResult: [],
        searchExtendedResult: [],
        searchKeywordValue: '',
        searchFilmsCountResult: 0,
        searchMaxPages: 1,
        searchNextPage: 1,
        searchStatus: 'search',
        searchTopStatus: 'TOP_250_BEST_FILMS',
        filterOptions: {
          yearFrom: 1000,
          yearTo: 3000,
          keyword: '',
          genre: 0,
          country: 0,
        },
      },
      account: {
        userData: {
          logged: false,
          userLogin: '',
          userName: '',
          userRole: 'guest',
          userToken: 'undefined',
          userPhoto,
        },
        watchLaterFilms: [],
        likedFilms: [],
        userList: [],
        userReviews: [],
        newRoles: {
          admins: [],
          banned: [],
          users: [],
        },
      },
      wallpapers: {
        fanArt: null,
        photoBank: [],
        posters: null,
        wallpapers: null,
      },
    };
  }

  public async loadAppData() {
    if (this.allData.account.userData.userRole === 'admin') {
      await this.setUserList();
    }
    const backendPremiereData = await apiService.getPremiere();
    const premiereID = Number(backendPremiereData.ID);
    const premiereLink = backendPremiereData.link;
    this.allData.premiere = await apiKinopoisk.getFilmData(premiereID);
    this.allData.premiere.link = premiereLink;

    // Получаем массив данных рекомендованных фильмов
    const dataTop = await apiKinopoisk.getTopData();
    this.allData.films = dataTop.films;

    // Получаем массив данных лучших фильмов
    const dataBestTop = await apiKinopoisk.getTopBestData();
    this.allData.best = dataBestTop.films;
  }

  public async loadMovieDataStaff(movieID: number) {
    // грузим данные для фильма
    this.allData.movieData = await apiKinopoisk.getFilmData(movieID);
    const staffAllData = await apiKinopoisk.getFilmStaff(movieID);
    this.allData.movieStaff = staffAllData;
  }

  public async loadMovieReviews(movieID: number) {
    // грузим рецензии фильма
    const reviews = await apiKinopoisk.getFilmReviews(movieID);
    const ourReviews = await apiService.getFilmReviews(movieID);
    const ourReviewItems = (ourReviews.data as unknown as IReview[]).reverse();
    reviews.total += ourReviewItems.length;
    reviews.totalNegativeReviews += ourReviewItems.filter((item) => item.type === 'NEGATIVE').length;
    reviews.totalPositiveReviews += ourReviewItems.filter((item) => item.type === 'POSITIVE').length;
    reviews.totalNeutralReviews += ourReviewItems.filter((item) => item.type === 'NEUTRAL').length;
    reviews.items.splice(0, 0, ...ourReviewItems);
    this.allData.movieReviews = reviews;
  }

  public async loadMovieBuget(movieID: number) {
    // грузим бюджет фильма
    const budget = await apiKinopoisk.getFilmBoxOffice(movieID);
    console.log('budget: ', budget);
  }

  public getStaffInfo() {
    return this.allData.movieStaff;
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

  public async setMoviePagePosters() {
    const wallpaperData = await apiKinopoisk.getFilmImages(Number(this.getMoviePageID()), 1, 'WALLPAPER');
    const posterData = await apiKinopoisk.getFilmImages(Number(this.getMoviePageID()), 1, 'POSTER');
    const fanArtData = await apiKinopoisk.getFilmImages(Number(this.getMoviePageID()), 1, 'FAN_ART');
    this.allData.wallpapers.wallpapers = wallpaperData;
    this.allData.wallpapers.posters = posterData;
    this.allData.wallpapers.fanArt = fanArtData;
    this.allData.wallpapers.photoBank = [...wallpaperData.items, ...posterData.items, ...fanArtData.items];
  }

  public getMoviePagePosters() {
    return this.allData.wallpapers;
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

  public setSearchTopResult(value: ITopData) {
    this.allData.search.searchTopResult = value.films;
  }

  public getSearchTopResult() {
    return this.allData.search.searchTopResult;
  }

  public setSearchExtendedResult(value: ExtendedSearchResultInterface) {
    this.allData.search.searchExtendedResult = value.items;
  }

  public getSearchExtendedResult() {
    return this.allData.search.searchExtendedResult;
  }

  public setSearchFilmsCountResult(value: number) {
    this.allData.search.searchFilmsCountResult = value;
  }

  public getSearchFilmsCountResult() {
    return this.allData.search.searchFilmsCountResult;
  }

  public setSearchMaxPages(value: number) {
    this.allData.search.searchMaxPages = value;
  }

  public getSearchMaxPages() {
    return this.allData.search.searchMaxPages;
  }

  public setSearchStatus(value: 'search' | 'top' | 'yearSearch') {
    this.allData.search.searchStatus = value;
  }

  public getSearchStatus() {
    return this.allData.search.searchStatus;
  }

  public setSearchTopStatus(value: 'TOP_250_BEST_FILMS' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS') {
    this.allData.search.searchTopStatus = value;
  }

  public getSearchTopStatus() {
    return this.allData.search.searchTopStatus;
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

  public setDefaultFilter() {
    this.allData.search.filterOptions = {
      yearFrom: 1000,
      yearTo: 3000,
      keyword: '',
      genre: 0,
      country: 0,
    };
  }

  public getSearchFilterOptions() {
    return this.allData.search.filterOptions;
  }

  public setFilterYearTo(year: number) {
    this.allData.search.filterOptions.yearTo = year;
  }

  public setFilterYearFrom(year: number) {
    this.allData.search.filterOptions.yearFrom = year;
  }

  public getFilterYearTo() {
    return this.allData.search.filterOptions.yearTo;
  }

  public getFilterYearFrom() {
    return this.allData.search.filterOptions.yearFrom;
  }

  public setFilterKeyword(keyword: string) {
    this.allData.search.filterOptions.keyword = keyword;
  }

  public getFilterKeyword() {
    return this.allData.search.filterOptions.keyword;
  }

  public setFilterGenre(id: number) {
    this.allData.search.filterOptions.genre = id;
  }

  public getFilterGenre() {
    return this.allData.search.filterOptions.genre;
  }

  public setFilterCountry(id: number) {
    this.allData.search.filterOptions.country = id;
  }

  public getFilterCountry() {
    return this.allData.search.filterOptions.country;
  }

  public setUserData(options: UserDataParams) {
    this.allData.account.userData.logged = options.logged ? options.logged : this.allData.account.userData.logged;
    this.allData.account.userData.userLogin = options.userLogin
      ? options.userLogin
      : this.allData.account.userData.userLogin;
    this.allData.account.userData.userName = options.userName
      ? options.userName
      : this.allData.account.userData.userName;
    this.allData.account.userData.userPhoto = options.userPhoto
      ? options.userPhoto
      : this.allData.account.userData.userPhoto;
    this.allData.account.userData.userToken = options.userToken
      ? options.userToken
      : this.allData.account.userData.userToken;
    this.allData.account.userData.userRole = options.userRole
      ? options.userRole
      : this.allData.account.userData.userRole;
  }

  public getUserData() {
    return this.allData.account.userData;
  }

  public getUserRole() {
    return this.allData.account.userData.userRole;
  }

  public getWatchLaterList() {
    return this.allData.account.watchLaterFilms;
  }

  public setWatchLaterList(arr: number[]) {
    this.allData.account.watchLaterFilms = arr;
  }

  public getLikedFilmsList() {
    return this.allData.account.likedFilms;
  }

  public setLikedFilmsList(arr: number[]) {
    this.allData.account.likedFilms = arr;
  }

  public resetLikedFimls() {
    this.allData.account.likedFilms = [];
    this.allData.account.watchLaterFilms = [];
  }

  public async setUserList() {
    const res = await apiService.getAllUsers();
    this.allData.account.userList = res.data as unknown as UsersList[];
  }

  public getUserList() {
    return this.allData.account.userList;
  }

  public getNewRoles() {
    return this.allData.account.newRoles;
  }

  public setNewAdminOne(data: UsersList) {
    this.allData.account.newRoles.admins = [...new Set(this.allData.account.newRoles.admins.concat(data))];
  }

  public setNewUsersOne(data: UsersList) {
    this.allData.account.newRoles.users = [...new Set(this.allData.account.newRoles.users.concat(data))];
  }

  public setNewBannedOne(data: UsersList) {
    this.allData.account.newRoles.banned = [...new Set(this.allData.account.newRoles.banned.concat(data))];
  }

  public setNewAdminsArr(data: UsersList[]) {
    this.allData.account.newRoles.admins = data;
  }

  public setNewUsersArr(data: UsersList[]) {
    this.allData.account.newRoles.users = data;
  }

  public setNewBannedArr(data: UsersList[]) {
    this.allData.account.newRoles.banned = data;
  }

  public setUserReviewList(data: IReviewBackend[]) {
    this.allData.account.userReviews = data;
  }

  public getUserReviewList() {
    return this.allData.account.userReviews;
  }
}

const state = new State();
export default state;
