type ObjectLocalStorage = {
  id: number;
  posterUrlPreview: string;
};

class LocalStorageUtil {
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
      if (element.id === ObjectMovie.id) {
        isMovie = true;
      }
    });
    if (!isMovie) {
      movies.push(ObjectMovie);
      window.localStorage.setItem(this.keyName, JSON.stringify(movies));
    }
  }
}

const storage = new LocalStorageUtil();
export default storage;
