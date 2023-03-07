import { IReviewBackend } from '../../../../shared/models/response-data';

class ReviewCheck {
  public checkType(data: IReviewBackend) {
    if (data.type === 'NEGATIVE') return ['review-card', 'review-card--negative'];
    if (data.type === 'POSITIVE') return ['review-card', 'review-card--positive'];
    return ['review-card'];
  }

  public formatData(data: IReviewBackend) {
    const newData = new Date(Date.parse(data.date));
    const year = newData.getFullYear();
    const mounth = newData.getMonth() + 1;
    const date = newData.getDate();
    const hour = newData.getHours();
    let mins: number | string = newData.getMinutes();
    if (mins < 10) {
      mins = `0${mins}`;
    }
    return `${date}.${mounth}.${year} ${hour}:${mins}`;
  }
}

const reviewCheck = new ReviewCheck();
export default reviewCheck;
