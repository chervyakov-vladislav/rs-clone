import './search-form.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../shared/components/base-elements/form-element';
import InputElement from '../../../../shared/components/base-elements/input-element';
import selectRender from '../../../services/extended-search-page/form/select-render.service';
import state from '../../../../shared/services/state';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import extendedRenderCards from '../../../services/extended-search-page/list-render/extended-render.service';
import formInputsObserver from '../../../services/extended-search-page/form/clear-inputs-observer';

export default class ExtendedSearchForm extends FormElement {
  private formColumn: DOMElement;

  private formRow: DOMElement;

  private keywordInput: InputElement;

  private genreSelectInput: InputElement;

  private countrySelectInput: InputElement;

  private yearFrom: InputElement;

  private yearTo: InputElement;

  private submit: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'form',
      classList: ['extended-search-form'],
      action: '#',
    });
    formInputsObserver.register(this.node as HTMLFormElement);
    this.node.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      state.setSearchNextPage(1);
      const options = state.getSearchFilterOptions();
      const newState = await apiKinopoisk.searchByFilter(options);
      state.setSearchStatus('search');
      state.setSearchExtendedResult(newState);
      state.setSearchMaxPages(newState.totalPages);
      state.setSearchFilmsCountResult(newState.total);
      extendedRenderCards.renderSearchFilms();
    });

    this.formColumn = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['extended-search-form__column'],
    });

    this.keywordInput = new InputElement(this.formColumn.node, {
      tagName: 'input',
      type: 'text',
      classList: ['extended-search-form__text-input'],
      placeholder: 'Введите название фильма',
    });
    this.keywordInput.node.addEventListener('change', (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      state.setFilterKeyword(value);
    });

    this.genreSelectInput = new InputElement(this.formColumn.node, {
      tagName: 'select',
      classList: ['extended-search-form__select-input'],
    });
    selectRender.registerGenresContainer(this.genreSelectInput.node);
    selectRender.renderGenres();
    this.genreSelectInput.node.addEventListener('change', (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      const genreID = selectRender.getGenreID(value);
      state.setFilterGenre(genreID);
    });

    this.submit = new ButtonElement(this.formColumn.node, {
      tagName: 'button',
      type: 'submit',
      classList: ['extended-search-form__submit'],
      content: 'Искать',
    });

    this.formColumn = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['extended-search-form__column'],
    });

    this.countrySelectInput = new InputElement(this.formColumn.node, {
      tagName: 'select',
      classList: ['extended-search-form__select-input'],
    });
    selectRender.registerCountriesContainer(this.countrySelectInput.node);
    selectRender.renderCountry();
    this.countrySelectInput.node.addEventListener('change', (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      const countryID = selectRender.getCountryID(value);
      state.setFilterCountry(countryID);
    });

    this.formRow = new DOMElement(this.formColumn.node, {
      tagName: 'div',
      classList: ['extended-search-form__row'],
    });

    this.yearFrom = new InputElement(this.formRow.node, {
      tagName: 'input',
      type: 'text',
      classList: ['extended-search-form__text-input'],
      placeholder: 'Год от',
    });
    this.yearFrom.node.addEventListener('input', (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      if (!/^\d+$/.test(value.slice(-1))) (e.target as HTMLInputElement).value = value.slice(0, -1);
      if (value.length > 4) (e.target as HTMLInputElement).value = value.slice(0, -1);
    });
    this.yearFrom.node.addEventListener('change', (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      state.setFilterYearFrom(Number(value));
    });

    this.yearTo = new InputElement(this.formRow.node, {
      tagName: 'input',
      type: 'text',
      classList: ['extended-search-form__text-input'],
      placeholder: 'Год до',
    });
    this.yearTo.node.addEventListener('input', (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      if (!/^\d+$/.test(value.slice(-1))) (e.target as HTMLInputElement).value = value.slice(0, -1);
      if (value.length > 4) (e.target as HTMLInputElement).value = value.slice(0, -1);
    });
    this.yearTo.node.addEventListener('change', (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      state.setFilterYearTo(Number(value));
    });
  }
}
