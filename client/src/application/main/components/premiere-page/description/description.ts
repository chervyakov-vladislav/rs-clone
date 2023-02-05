import './description.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import state from '../../../../shared/services/state';
import SVG from '../../../../shared/components/svg-icons';

export default class Description extends DOMElement {
  private firstRow: DOMElement;

  private titleContainer: DOMElement;

  private title: DOMElement;

  private nameEng: DOMElement;

  private description: DOMElement;

  private ratingContainer: DOMElement;

  private rating: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['premiere-desc'],
    });

    const data = state.allData.premiere;
    console.log(data);

    this.firstRow = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['premiere-desc__first-row'],
    });

    this.titleContainer = new DOMElement(this.firstRow.node, {
      tagName: 'div',
      classList: ['premiere-desc__title-continer'],
    });

    this.title = new DOMElement(this.titleContainer.node, {
      tagName: 'h1',
      classList: ['premiere-desc__title'],
      content: `${data?.nameRu} (${data?.year})`,
    });

    this.nameEng = new DOMElement(this.titleContainer.node, {
      tagName: 'span',
      classList: ['premiere-desc__eng-title'],
      content: data?.nameOriginal as string,
    });

    this.description = new DOMElement(this.titleContainer.node, {
      tagName: 'p',
      classList: ['premiere-desc__desc'],
      content: data?.description as string,
    });

    this.ratingContainer = new DOMElement(this.firstRow.node, {
      tagName: 'div',
      classList: ['premiere-desc__rating-container'],
      content: 'Рейтинг фильма ',
    });

    this.rating = new DOMElement(this.ratingContainer.node, {
      tagName: 'div',
      classList: ['premiere-desc__rating'],
    });
    this.rating.node.innerHTML = `${SVG.leftGoldBranch} ${data?.ratingImdb} ${SVG.rightGoldBranch}`;
  }
}
