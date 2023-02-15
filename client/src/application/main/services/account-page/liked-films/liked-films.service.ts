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
    }
  }

  public removeWatchLaterValue(value: number) {
    const currentArrr = state.getWatchLaterList();
    if (this.checkWatchLaterList(value)) {
      const newArr = currentArrr.filter((item) => item !== value);
      state.setWatchLaterList(newArr);
    }
  }
}

const likeFilmsService = new LikeFilmsService();
export default likeFilmsService;
