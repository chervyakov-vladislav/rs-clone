import { TSObject } from '../models/base-types';
import { ObjectLocalStorage } from '../models/response-data';

class LocalStorage {
  private storageKeys: TSObject;

  constructor() {
    this.storageKeys = {
      moviesKey: 'visitedMovies',
      tokenKey: 'tokenJW',
    };
  }

  public getMovies() {
    const moviesLocalStorage = localStorage.getItem(this.storageKeys.moviesKey);
    if (moviesLocalStorage !== null) {
      return JSON.parse(moviesLocalStorage);
    }
    return [];
  }

  public putMovies(ObjectMovie: ObjectLocalStorage) {
    let movies = this.getMovies();
    movies = movies.filter((element: ObjectLocalStorage) => element.filmId !== ObjectMovie.filmId);
    movies.unshift(ObjectMovie);
    window.localStorage.setItem(this.storageKeys.moviesKey, JSON.stringify(movies));
  }

  public getToken(): string {
    return localStorage.getItem(this.storageKeys.tokenKey) || '';
  }

  public setToken(token: string): void {
    localStorage.setItem(this.storageKeys.tokenKey, token);
  }
}

const storage = new LocalStorage();
export default storage;
