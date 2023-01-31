import './side-menu.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { LinkElement } from '../../../../shared/components/base-elements/link-element';
import { SVG } from '../../../../shared/components/svg-icons';

export class SideMenu extends DOMElement {
  private mainPageItem: DOMElement;

  private mainPagePic: DOMElement;

  private mainPageLink: LinkElement;

  private moviesItem: DOMElement;

  private moviesPic: DOMElement;

  private moviesLink: LinkElement;

  private serialsItem: DOMElement;

  private serialsPic: DOMElement;

  private serialsLink: LinkElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['side-menu__list'],
    });

    this.mainPageItem = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['side-menu__item'],
    });

    this.mainPagePic = new DOMElement(this.mainPageItem.node, {
      tagName: 'span',
      classList: ['side-menu__pic'],
    });
    this.mainPagePic.node.innerHTML = SVG.homeIcon;

    this.mainPageLink = new LinkElement(this.mainPageItem.node, {
      tagName: 'a',
      href: '#',
      classList: ['side-menu__link'],
      content: 'Главная',
    });

    this.moviesItem = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['side-menu__item'],
    });

    this.moviesPic = new DOMElement(this.moviesItem.node, {
      tagName: 'span',
      classList: ['side-menu__pic'],
    });
    this.moviesPic.node.innerHTML = SVG.moviesIcon;

    this.moviesLink = new LinkElement(this.moviesItem.node, {
      tagName: 'a',
      href: '#',
      classList: ['side-menu__link'],
      content: 'Фильмы',
    });

    this.serialsItem = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['side-menu__item'],
    });

    this.serialsPic = new DOMElement(this.serialsItem.node, {
      tagName: 'span',
      classList: ['side-menu__pic'],
    });
    this.serialsPic.node.innerHTML = SVG.serialsIcon;

    this.serialsLink = new LinkElement(this.serialsItem.node, {
      tagName: 'a',
      href: '#',
      classList: ['side-menu__link'],
      content: 'Сериалы',
    });
  }
}
