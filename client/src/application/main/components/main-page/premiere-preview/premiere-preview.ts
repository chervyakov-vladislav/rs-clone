import './premiere-preview.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import state from '../../../../shared/services/state';
import { IFilmData } from '../../../../shared/models/response-data';

export default class PremierePreview extends DOMElement {
  private premiereImage: ImageElement;

  private premiereText: DOMElement;

  private premiereName: DOMElement;

  private premiereBtn: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['premiere-preview'],
    });

    const premiereState = state.allData.premiere as IFilmData;

    this.premiereImage = new ImageElement(this.node, {
      tagName: 'img',
      classList: ['premiere__img'],
      src: premiereState.coverUrl,
    });

    this.premiereName = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['premiere__name'],
      content: premiereState.nameRu,
    });

    this.premiereText = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['premiere__text'],
      content: premiereState.description,
    });

    this.premiereBtn = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['premiere__button'],
      content: 'Трейлер',
    });

    this.premiereBtn.node.addEventListener('click', () => {
      window.location.hash = '#premiere';
    });
  }
}
