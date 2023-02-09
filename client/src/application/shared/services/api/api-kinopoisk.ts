import { IFilmData, ITopData, KeyWordSearchInterface } from '../../models/response-data';

class ApiServiceKinopoisk {
  // private apiKey = 'd11e71fe-35f6-4512-896d-d9880388525c';
  // private apiKey = '864bc0bb-a854-41d0-b411-dcc8376d4427';
  // private apiKey = '182fab2b-cb7a-4562-b6c0-fefa3b89590f';
  // private apiKey = '1eed0f50-3f3b-49f1-b171-1547c878ae42';
  // private apiKey = '7c38ea01-5532-4218-b760-e89055155e5a';
  // private apiKey = '268e5c31-c58a-4bdb-b553-7bb959f052b3';
  // private apiKey = 'c788be1c-9682-4896-bbe2-275683222b78';
  // private apiKey = '5724b5bc-0be1-4cb9-a88e-710c097a9c01';
  // private apiKey = 'f36bbe93-5681-4a31-a74f-f9f36450cdb7';
  // private apiKey = 'e90cfcea-db6a-4efc-8436-577ca4a173d0';
  // private apiKey = '70b23d2e-8d30-4bd6-ad84-b3addb39fa44';
  // private apiKey = 'b7f13992-d5e9-4deb-a225-1692bcdd1f07';
  private apiKey = '34f08f04-ad84-4aec-a0dd-bab9cc1bd380';

  private baseUrl: string = 'https://kinopoiskapiunofficial.tech/api';

  private filmData: string = `${this.baseUrl}/v2.2/films`;

  private filmStaff: string = `${this.baseUrl}/v1/staff?filmId=`;

  // Выбор топ фильмов TOP_100_POPULAR_FILMS, TOP_250_BEST_FILMS, TOP_AWAIT_FILMS
  // Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов.
  private topFilms: string = `${this.filmData}/top?type=TOP_100_POPULAR_FILMS&page=`;

  private topBestFilms: string = `${this.filmData}/top?type=TOP_250_BEST_FILMS&page=`;

  private searchByKeyword: string = `${this.baseUrl}/v2.1/films/search-by-keyword`;

  private searchFilterAdress: string = `${this.baseUrl}/v2.2/films`;

  public async getFilmData(id: number): Promise<IFilmData> {
    const response = await fetch(`${this.filmData}/${id}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  // Данный эндпоинт возвращает изображения связанные с фильмом с пагинацией.
  // Каждая страница содержит не более чем 20 фильмов.
  // Доступные изображения:
  // STILL - кадры
  // SHOOTING - изображения со съемок
  // POSTER - постеры
  // FAN_ART - фан-арты
  // PROMO - промо
  // CONCEPT - концепт-арты
  // WALLPAPER - обои
  // COVER - обложки
  // SCREENSHOT - скриншоты
  public async getFilmImages(id: number, page = 1): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}/images?type=POSTER&page=${page}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getFilmReviews(id: number): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}/reviews`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getFilmVideos(id: number): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}/videos`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getFilmBoxOffice(id: number): Promise<void> {
    const response = await fetch(`${this.filmData}/${id}/box_office`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getFilmStaff(id: number): Promise<void> {
    const response = await fetch(`${this.filmStaff}${id}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getTopData(page = 1): Promise<ITopData> {
    const response = await fetch(`${this.topFilms}${page}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async getTopBestData(page = 1): Promise<ITopData> {
    const response = await fetch(`${this.topBestFilms}${page}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }

  public async searchKeyword(word: string, page = 1) {
    const response = await fetch(`${this.searchByKeyword}?keyword=${word}&page=${page}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data: KeyWordSearchInterface = await response.json();
    return data;
  }

  public async searchByFilter(word = '', page = 1) {
    const response = await fetch(`${this.searchByKeyword}потом напишем этот гениальный запрос${word}&page=${page}`, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
    const data = await response.json();
    return data;
  }
}

const apiKinopoisk = new ApiServiceKinopoisk();
export default apiKinopoisk;
