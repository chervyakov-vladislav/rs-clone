import './change-premiere.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../../shared/components/base-elements/form-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import InputElement from '../../../../../shared/components/base-elements/input-element';
import state from '../../../../../shared/services/state';
import { IFilmData } from '../../../../../shared/models/response-data';
import apiKinopoisk from '../../../../../shared/services/api/api-kinopoisk';
import apiService from '../../../../../shared/services/api/server-api.service';

export default class ChangePreviere extends DOMElement {
  private title: DOMElement;

  private form: FormElement;

  private movieInput: InputElement;

  private trailerInput: InputElement;

  private formText: DOMElement;

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

    this.formText = new DOMElement(this.form.node, {
      tagName: 'div',
      classList: ['change-premiere__info'],
    });

    this.submit = new ButtonElement(this.form.node, {
      tagName: 'button',
      classList: ['change-premiere__submit'],
      type: 'submit',
      content: 'Изменить',
    });

    this.form.node.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      const currentState = state.getPremiereInfo() as IFilmData;
      const filmValue = (this.movieInput.node as HTMLInputElement).value;
      const trailerValue = (this.trailerInput.node as HTMLInputElement).value;
      const filmID = this.validateFilmID(filmValue);
      const newData = filmValue.length > 0 ? await apiKinopoisk.getFilmData(filmID) : currentState;
      newData.link = trailerValue.length > 0 ? trailerValue : currentState.link;
      state.allData.premiere = newData;
      await apiService.setPremiere({
        ID: newData.kinopoiskId.toString(),
        link: newData.link,
      });
      this.formText.node.innerText = 'Данные изменены';
      setTimeout(() => {
        this.formText.node.innerText = '';
      }, 5_000);
    });
  }

  private validateFilmID(value: string) {
    if (value.includes('#movie')) {
      const newValue = value.split('/').pop();
      return Number(newValue);
    }
    return Number(value);
  }
}
