import './premiere-preview.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import ButtonElement from '../../../../shared/components/base-elements/button-element';

export default class PremierePreview extends DOMElement {
  private premiereImage: ImageElement | undefined;

  private premiereText: DOMElement | undefined;

  private premiereName: DOMElement | undefined;

  private premiereBtn: ButtonElement | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['premiere-preview'],
    });

    const showFilmData = async (id = 1224067) => {
      const data = await apiKinopoisk.getFilmData(id);
      this.premiereImage = new ImageElement(this.node, {
        tagName: 'img',
        classList: ['premiere__img'],
        src: data.coverUrl,
      });

      this.premiereName = new DOMElement(this.node, {
        tagName: 'div',
        classList: ['premiere__name'],
        content: data.nameRu,
      });

      this.premiereText = new DOMElement(this.node, {
        tagName: 'div',
        classList: ['premiere__text'],
        content: data.description,
      });

      this.premiereBtn = new ButtonElement(this.node, {
        tagName: 'button',
        classList: ['premiere__button'],
        content: 'Трейлер',
      });
    };
    showFilmData();
  }
}
