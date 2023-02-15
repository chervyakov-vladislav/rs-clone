import './review-form.scss';
// import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../../shared/components/base-elements/form-element';

export default class ReviewForm {
  private reviewForm: DOMElement;

  private formTitle: DOMElement;

  private formWrapper: DOMElement;

  private formHeader: DOMElement;

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
  }
}
