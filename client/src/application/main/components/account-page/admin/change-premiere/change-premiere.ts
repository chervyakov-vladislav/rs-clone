import './change-premiere.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../../shared/components/base-elements/form-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import InputElement from '../../../../../shared/components/base-elements/input-element';

export default class ChangePreviere extends DOMElement {
  private title: DOMElement;

  private form: FormElement;

  private movieInput: InputElement;

  private trailerInput: InputElement;

  private submit: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['change-premiere'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      content: 'Поменять премьеру',
      classList: ['change-premiere__title'],
    });

    this.form = new FormElement(this.node, {
      tagName: 'form',
      classList: ['change-premiere__form'],
      action: '#account',
    });

    this.movieInput = new InputElement(this.form.node, {
      tagName: 'input',
      classList: ['change-premiere__text-input'],
      placeholder: 'Страница фильма или ID',
    });

    this.trailerInput = new InputElement(this.form.node, {
      tagName: 'input',
      classList: ['change-premiere__text-input'],
      placeholder: 'Ссылка на трейлер',
    });

    this.submit = new ButtonElement(this.form.node, {
      tagName: 'button',
      classList: ['change-premiere__submit'],
      type: 'submit',
      content: 'Изменить',
    });

    this.form.node.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      console.log('change');
    });
  }
}
