import { IReviewsData } from '../../../../../shared/models/response-data';
import state from '../../../../../shared/services/state';
import UserReview from '../user-review';

class ReviewFormServices {
  private count: HTMLElement;

  constructor() {
    this.count = document.createElement('div');
  }

  public registredCount(element: HTMLElement) {
    this.count = element;
  }

  public addReviewToState(reviews: IReviewsData) {
    const inputSelect = document.querySelector('.review-form__select-input') as HTMLInputElement;
    const select = this.checkTypeReview(inputSelect.value);
    const messageType = document.querySelector('.review-form__message.type') as HTMLElement;

    const inputTitle = document.querySelector('input[type="text"]') as HTMLInputElement;
    const messageTitle = document.querySelector('.review-form__message.title') as HTMLElement;

    const inputText = document.querySelector('.review-form__textarea') as HTMLInputElement;
    const messageText = document.querySelector('.review-form__message.text') as HTMLElement;

    const currentDate = new Date().toISOString().slice(0, 19);

    if (select === undefined) {
      messageType.innerText = 'Не выбран тип рецензии!';
      return;
    }
    messageType.innerHTML = '';

    if (inputTitle.value === '') {
      messageTitle.innerText = 'Введите заголовок!';
      return;
    }
    messageTitle.innerHTML = '';

    if (inputText.value === '') {
      messageText.innerText = 'Введите текст!';
      return;
    }
    messageText.innerHTML = '';
    const userData = state.getUserData();
    const item = {
      author: userData.userName,
      date: currentDate,
      description: inputText.value,
      kinopoiskId: 4370148,
      negativeRating: 0,
      positiveRating: 1,
      title: inputTitle.value,
      type: select,
    };

    if (reviews) {
      reviews.items.unshift(item);
      (state.allData.movieReviews as IReviewsData).total = 1;
    }

    const reviewsReviews = document.querySelector('.users-reviews__reviews') as HTMLElement;
    const reviewContainer = document.createElement('div');
    reviewsReviews.prepend(new UserReview(reviewContainer, item).node);
  }

  private checkTypeReview(type: string): string | undefined {
    if (type === 'Позитивная') {
      return 'POSITIVE';
    }
    if (type === 'Негативная') {
      return 'NEGATIVE';
    }
    if (type === 'Нейтральная') {
      return 'NEUTRAL';
    }
    return undefined;
  }
}

const formServices = new ReviewFormServices();
export default formServices;
