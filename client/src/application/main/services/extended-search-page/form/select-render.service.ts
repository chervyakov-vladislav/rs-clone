import DOMElement from '../../../../shared/components/base-elements/dom-element';
import genres from '../../../../shared/components/genres';
import countries from '../../../../shared/components/countries';

class SelectRender {
  private genresContainer: HTMLElement | null = null;

  private option: DOMElement | null = null;

  private countriesContainer: HTMLElement | null = null;

  public registerGenresContainer(elem: HTMLElement) {
    this.genresContainer = elem;
  }

  public registerCountriesContainer(elem: HTMLElement) {
    this.countriesContainer = elem;
  }

  public renderGenres() {
    genres.forEach((genre) => {
      this.option = new DOMElement(this.genresContainer, {
        tagName: 'option',
        classList: ['extended-search-form__select-option'],
        content: genre.genre,
      });
    });
  }

  public getGenreID(name: string) {
    return genres.filter((item) => item.genre === name)[0].id;
  }

  public renderCountry() {
    countries.forEach((country) => {
      this.option = new DOMElement(this.countriesContainer, {
        tagName: 'option',
        classList: ['extended-search-form__select-option'],
        content: country.country,
      });
    });
  }

  public getCountryID(name: string) {
    return countries.filter((item) => item.country === name)[0].id;
  }
}

const selectRender = new SelectRender();
export default selectRender;
