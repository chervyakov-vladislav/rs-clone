import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { IFilmData } from '../../../../shared/models/response-data';
import movieValue from '../../../services/movie-page/movie-value.service';
import './movie-description.scss';

export default class MovieDescription {
  private title: DOMElement;

  private description: DOMElement;

  constructor(container: HTMLElement, item: IFilmData) {
    this.title = new DOMElement(container, {
      tagName: 'h3',
      classList: ['movie-description__title'],
      content: 'Обзор',
    });

    this.description = new DOMElement(container, {
      tagName: 'p',
      classList: ['movie-description__text'],
      content: `${movieValue.getDescription(item)}`,
    });
  }
}
