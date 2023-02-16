import state from '../../../../shared/services/state';

class LikeFilmsService {
  public checkWatchLaterList(value: number) {
    const currentArrr = state.getWatchLaterList();
    return currentArrr.indexOf(value) > -1;
  }

  public appendWatchLaterValue(value: number) {
    const currentArrr = state.getWatchLaterList();
    if (!this.checkWatchLaterList(value)) {
      currentArrr.push(value);
      state.setWatchLaterList(currentArrr);
      // кидаем новое значение currentArrr на бек
    }
  }

  public removeWatchLaterValue(value: number) {
    const currentArrr = state.getWatchLaterList();
    if (this.checkWatchLaterList(value)) {
      const newArr = currentArrr.filter((item) => item !== value);
      state.setWatchLaterList(newArr);
      // кидаем новое значение newArr на бек
    }
  }

  public checkLikedFilmsList(value: number) {
    const currentArrr = state.getLikedFilmsList();
    return currentArrr.indexOf(value) > -1;
  }

  public appendLikedFilmsValue(value: number) {
    const currentArrr = state.getLikedFilmsList();
    if (!this.checkLikedFilmsList(value)) {
      currentArrr.push(value);
      state.setLikedFilmsList(currentArrr);
      // кидаем новое значение currentArrr на бек
    }
  }

  public removeLikedFilmsValue(value: number) {
    const currentArrr = state.getLikedFilmsList();
    if (this.checkLikedFilmsList(value)) {
      const newArr = currentArrr.filter((item) => item !== value);
      state.setLikedFilmsList(newArr);
      // кидаем новое значение newArr на бек
    }
  }
}

const likeFilmsService = new LikeFilmsService();
export default likeFilmsService;
