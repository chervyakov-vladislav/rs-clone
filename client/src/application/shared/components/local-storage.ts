import { ObjectLocalStorage } from '../models/response-data';

class LocalStorage {
  keyName: string;

  constructor() {
    this.keyName = 'visitedMovies';
  }

  getMovies() {
    const moviesLocalStorage = localStorage.getItem(this.keyName);
    if (moviesLocalStorage !== null) {
      return JSON.parse(moviesLocalStorage);
    }
    return [];
  }

  putMovies(ObjectMovie: ObjectLocalStorage) {
    const movies = this.getMovies();
    let isMovie = false;
    movies.forEach((element: ObjectLocalStorage) => {
      if (element.filmId === ObjectMovie.filmId) {
        isMovie = true;
      }
    });
    if (!isMovie) {
      movies.push(ObjectMovie);
      window.localStorage.setItem(this.keyName, JSON.stringify(movies));
    }
  }
}

const storage = new LocalStorage();
export default storage;
