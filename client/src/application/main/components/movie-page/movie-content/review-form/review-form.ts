import './review-form.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../../shared/components/base-elements/form-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import InputElement from '../../../../../shared/components/base-elements/input-element';
import { IReviewsData } from '../../../../../shared/models/response-data';
import formServices from './review-form.services';

export default class ReviewForm {
  private reviewForm: DOMElement;

  private formTitle: DOMElement;

  private formWrapper: DOMElement;

  private formHeader: DOMElement;

  private formBody: DOMElement;

  private formSelect: DOMElement;

  private formButton: DOMElement;

  private keywordTitle: DOMElement;

  private keywordInput: InputElement;

  private keywordSelect: InputElement;

  private optionType: DOMElement;

  private optionTypePositive: DOMElement;

  private optionTypeNegative: DOMElement;

  private optionTypeNeutral: DOMElement;

  private keywordText: DOMElement;

  private typeMessage: DOMElement;

  private titleMessage: DOMElement;

  private textMessage: DOMElement;

  private reviews: IReviewsData;

  constructor(container: HTMLElement, reviews: IReviewsData) {
    this.reviews = reviews;

    this.reviewForm = new FormElement(container, {
      tagName: 'form',
      classList: ['review-form'],
    });

    this.formTitle = new DOMElement(this.reviewForm.node, {
      tagName: 'div',
      classList: ['review-form__title'],
      content: 'Написать рецензию',
    });

    this.formWrapper = new DOMElement(this.reviewForm.node, {
      tagName: 'div',
      classList: ['review-form__wrapper'],
    });

    this.formHeader = new DOMElement(this.formWrapper.node, {
      tagName: 'div',
      classList: ['review-form__header'],
    });

    this.formBody = new DOMElement(this.formWrapper.node, {
      tagName: 'div',
      classList: ['review-form__body'],
      id: 'review-form',
    });

    this.formSelect = new DOMElement(this.formBody.node, {
      tagName: 'div',
      classList: ['review-form__select'],
    });

    this.keywordSelect = new InputElement(this.formSelect.node, {
      tagName: 'select',
      classList: ['review-form__select-input'],
    });

    this.optionType = new DOMElement(this.keywordSelect.node, {
      tagName: 'option',
      classList: ['review-form__select-option'],
      content: 'Тип рецензии',
    });

    this.optionTypePositive = new DOMElement(this.keywordSelect.node, {
      tagName: 'option',
      classList: ['review-form__select-option'],
      content: 'Позитивная',
    });

    this.optionTypeNegative = new DOMElement(this.keywordSelect.node, {
      tagName: 'option',
      classList: ['review-form__select-option'],
      content: 'Негативная',
    });

    this.optionTypeNeutral = new DOMElement(this.keywordSelect.node, {
      tagName: 'option',
      classList: ['review-form__select-option'],
      content: 'Нейтральная',
    });

    this.typeMessage = new DOMElement(this.formSelect.node, {
      tagName: 'span',
      classList: ['review-form__message', 'type'],
    });

    this.keywordTitle = new DOMElement(this.formBody.node, {
      tagName: 'div',
      classList: ['review-form__keyword_title'],
    });

    this.keywordInput = new InputElement(this.keywordTitle.node, {
      tagName: 'input',
      type: 'text',
      classList: ['review-form__text-input'],
      placeholder: 'Заголовок',
    });

    this.titleMessage = new DOMElement(this.keywordTitle.node, {
      tagName: 'span',
      classList: ['review-form__message', 'title'],
      content: '',
    });

    this.keywordText = new InputElement(this.formBody.node, {
      tagName: 'textarea',
      classList: ['review-form__textarea'],
      placeholder: 'Текст',
    });

    this.textMessage = new DOMElement(this.formBody.node, {
      tagName: 'span',
      classList: ['review-form__message', 'text'],
      content: '',
    });

    this.formButton = new ButtonElement(this.formBody.node, {
      tagName: 'button',
      type: 'submit',
      classList: ['review-form__button'],
      content: 'Отправить рецензию',
    });
    this.reviewForm.node.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      formServices.addReviewToState(reviews);
      const reviewForm = document.querySelector('.users-reviews__title');
      if (reviewForm && formServices.formCheck) {
        reviewForm.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    });
  }
}
