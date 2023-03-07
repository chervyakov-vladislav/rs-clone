import { TSObject } from '../../../../../shared/models/base-types';
import apiService from '../../../../../shared/services/api/server-api.service';
import state from '../../../../../shared/services/state';
import UserReview from '../user-review';

class ReviewFormServices {
  private countTotal: HTMLElement;

  private countPositive: HTMLElement;

  private countNegative: HTMLElement;

  private countNeutral: HTMLElement;

  public formCheck: boolean;

  constructor() {
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

  public async addReview(type: string, title: string, text: string) {
    this.formCheck = true;
    const select = this.checkTypeReview(type);
    const messageType = document.querySelector('.review-form__message.type') as HTMLElement;
    const messageTitle = document.querySelector('.review-form__message.title') as HTMLElement;
    const messageText = document.querySelector('.review-form__message.text') as HTMLElement;
    const currentDate = new Date().toISOString().slice(0, 19);

    if (select === undefined) {
      messageType.innerText = 'Не выбран тип рецензии!';
      this.formCheck = false;
      return;
    }
    messageType.innerHTML = '';

    if (title === '') {
      messageTitle.innerText = 'Введите заголовок!';
      this.formCheck = false;
      return;
    }
    messageTitle.innerHTML = '';

    if (text === '') {
      messageText.innerText = 'Введите текст!';
      this.formCheck = false;
      return;
    }
    messageText.innerHTML = '';

    if (state.getUserRole() === 'banned') {
      messageText.innerText = 'Вы забанены за плохое поведение';
      this.formCheck = false;
      return;
    }
    messageText.innerHTML = '';

    const userData = state.getUserData();
    const item = {
      author: userData.userName,
      date: currentDate,
      description: text,
      kinopoiskId: 4370148,
      negativeRating: 0,
      positiveRating: 0,
      title,
      type: select,
    };

    const res = await this.addReviewToServer(item as unknown as TSObject);

    if (res && res.errors) {
      messageText.innerText = (res.errors as unknown as TSObject).msg;
      this.formCheck = false;
      return;
    }

    const reviews = state.allData.movieReviews;
    reviews.items.unshift(item);
    reviews.total += 1;
    this.countTotal.innerHTML = `${reviews.total}`;

    if (select === 'POSITIVE') {
      reviews.totalPositiveReviews += 1;
      this.countPositive.innerHTML = `${reviews.totalPositiveReviews}`;
    }
    if (select === 'NEGATIVE') {
      reviews.totalNegativeReviews += 1;
      this.countNegative.innerHTML = `${reviews.totalNegativeReviews}`;
    }
    if (select === 'NEUTRAL') {
      reviews.totalNeutralReviews += 1;
      this.countNeutral.innerHTML = `${reviews.totalNeutralReviews}`;
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

  private async addReviewToServer(item: TSObject) {
    const { hash } = window.location;
    const movieID = hash.split('/')[1];
    const res = await apiService.createReview(item, movieID);
    return res;
  }
}

const formServices = new ReviewFormServices();
export default formServices;
