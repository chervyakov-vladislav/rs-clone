import './review-form.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../../shared/components/base-elements/form-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import InputElement from '../../../../../shared/components/base-elements/input-element';

export default class ReviewForm {
  private reviewForm: DOMElement;

  private formTitle: DOMElement;

  private formWrapper: DOMElement;

  private formHeader: DOMElement;

  private formBody: DOMElement;

  private formSelect: DOMElement;

  private formButton: DOMElement;

  private keywordInput: InputElement;

  private keywordSelect: InputElement;

  private optionType: DOMElement;

  private optionTypePositive: DOMElement;

  private optionTypeNegative: DOMElement;

  private optionTypeNeutral: DOMElement;

  private keywordText: DOMElement;

  constructor(container: HTMLElement) {
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

    this.keywordInput = new InputElement(this.formBody.node, {
      tagName: 'input',
      type: 'text',
      classList: ['review-form__text-input'],
      placeholder: 'Заголовок',
    });

    this.keywordText = new InputElement(this.formBody.node, {
      tagName: 'textarea',
      classList: ['review-form__textarea'],
      placeholder: 'Техт',
    });

    this.formButton = new ButtonElement(this.formBody.node, {
      tagName: 'button',
      type: 'submit',
      classList: ['review-form__button'],
      content: 'Отправить рецензию',
    });
    this.formButton.node.addEventListener('click', () => {
      const inputSelect = document.querySelector('.review-form__select-input') as HTMLInputElement;
      const inputTitle = document.querySelector('input[type="text"]') as HTMLInputElement;
      const inputText = document.querySelector('.review-form__textarea') as HTMLInputElement;
      const date = new Date().toISOString().slice(0, 19);
      console.log(inputSelect.value, inputTitle.value, inputText.value, date);
    });
  }
}
