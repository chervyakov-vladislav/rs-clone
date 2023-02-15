import { IFilmData } from '../../../../shared/models/response-data';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import state from '../../../../shared/services/state';
import LikedFilmCard from '../../../components/account-page/user-data/film-card/film-card';

class LikeFilmsRenderService {
  private containerWatchLater: HTMLElement;

  private containerLiked: HTMLElement;

  private newCard: LikedFilmCard | null = null;

  constructor() {
    this.containerWatchLater = document.createElement('div');
    this.containerLiked = document.createElement('div');
  }

  public registerContainerWathcLater(elem: HTMLElement) {
    this.containerWatchLater = elem;
  }

  public registerContainerLiked(elem: HTMLElement) {
    this.containerLiked = elem;
  }

  public async renderWatchLater() {
    const currentDataID = state.getWatchLaterList();
    const filmsData = currentDataID.map(async (id, index) => {
      if (index < 7) {
        // есть ограничение на запрос, не больше 6 в секунду
        const data = await apiKinopoisk.getFilmData(id);
        return data;
      }
      return null;
    });
    filmsData.forEach(async (film, index) => {
      if (index < 7) {
        const data = await film;
        this.newCard = new LikedFilmCard(this.containerWatchLater, data as IFilmData);
      }
    });
  }
}

const likedFilmsRender = new LikeFilmsRenderService();
export default likedFilmsRender;
