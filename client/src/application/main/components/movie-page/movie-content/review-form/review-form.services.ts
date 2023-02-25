import { IReviewsData } from '../../../../../shared/models/response-data';
import state from '../../../../../shared/services/state';
import UserReview from '../user-review';

class ReviewFormServices {
  private countTotal: HTMLElement;

  private countPositive: HTMLElement;

  private countNegative: HTMLElement;

  private countNeutral: HTMLElement;

  public formCheck: boolean;

  private reviews: IReviewsData;

  constructor() {
    this.reviews = state.allData.movieReviews;
    this.countTotal = document.createElement('div');
    this.countPositive = document.createElement('div');
    this.countNegative = document.createElement('div');
    this.countNeutral = document.createElement('div');
    this.formCheck = false;
  }

  public registredCountTotal(element: HTMLElement) {
    this.countTotal = element;
  }

  public registredCountPositive(element: HTMLElement) {
    this.countPositive = element;
  }

  public registredCountNegative(element: HTMLElement) {
    this.countNegative = element;
  }

  public registredCountNeutral(element: HTMLElement) {
    this.countNeutral = element;
  }

  public addReviewToState() {
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

    this.formCheck = true;

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

    this.reviews.items.unshift(item);

    this.reviews.total += 1;
    this.countTotal.innerHTML = `${this.reviews.total}`;

    if (select === 'POSITIVE') {
      this.reviews.totalPositiveReviews += 1;
      this.countPositive.innerHTML = `${this.reviews.totalPositiveReviews}`;
    }
    if (select === 'NEGATIVE') {
      this.reviews.totalNegativeReviews += 1;
      this.countNegative.innerHTML = `${this.reviews.totalNegativeReviews}`;
    }
    if (select === 'NEUTRAL') {
      this.reviews.totalNeutralReviews += 1;
      this.countNeutral.innerHTML = `${this.reviews.totalNeutralReviews}`;
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
