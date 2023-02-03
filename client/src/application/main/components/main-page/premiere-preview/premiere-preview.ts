import './premiere-preview.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import state from '../../../../shared/services/state';

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

    this.premiereImage = new ImageElement(this.node, {
      tagName: 'img',
      classList: ['premiere__img'],
      src: state.allData.premiere.coverUrl,
    });

    this.premiereName = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['premiere__name'],
      content: state.allData.premiere.nameRu,
    });

    this.premiereText = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['premiere__text'],
      content: state.allData.premiere.description,
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
