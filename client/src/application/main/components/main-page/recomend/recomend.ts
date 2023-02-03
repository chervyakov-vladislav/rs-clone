import './recomend.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import SVG from '../../../../shared/components/svg-icons';
import LinkElement from '../../../../shared/components/base-elements/link-element';

export default class RecomendPreview extends DOMElement {
  private recomendTitle: DOMElement | undefined;

  private recomendLink: DOMElement | undefined;

  private recomendPic: DOMElement | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['premiere-recomend'],
    });

    this.recomendTitle = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['recomend__title'],
    });

    this.recomendLink = new LinkElement(this.recomendTitle.node, {
      tagName: 'a',
      href: '#',
      classList: ['recomend__title_link'],
      content: 'Рекомендации',
    });

    this.recomendPic = new DOMElement(this.recomendTitle.node, {
      tagName: 'span',
      classList: ['side-menu__pic'],
    });
    this.recomendPic.node.innerHTML = SVG.recomendArrow;

    this.recomendTitle.node.addEventListener('click', () => {
      window.location.hash = '#premiere';
    });
  }
}
