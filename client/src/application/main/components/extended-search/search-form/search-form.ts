import './search-form.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../shared/components/base-elements/form-element';
import InputElement from '../../../../shared/components/base-elements/input-element';
import selectRender from '../../../services/extended-search-page/form/select-render.service';

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

    this.genreSelectInput = new InputElement(this.formColumn.node, {
      tagName: 'select',
      classList: ['extended-search-form__select-input'],
    });
    selectRender.registerGenresContainer(this.genreSelectInput.node);
    selectRender.renderGenres();

    this.submit = new ButtonElement(this.formColumn.node, {
      tagName: 'button',
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

    this.yearTo = new InputElement(this.formRow.node, {
      tagName: 'input',
      type: 'text',
      classList: ['extended-search-form__text-input'],
      placeholder: 'Год до',
    });
  }
}
