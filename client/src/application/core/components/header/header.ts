import './header.scss';

import { ButtonElement } from '../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';

export class Header extends DOMElement {
  private container: DOMElement;

  private headerButtons: DOMElement;

  private headerLogo: DOMElement;

  public garageButton: ButtonElement;

  public winnersButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, { tagName: 'header', classList: ['header'] });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'header__container'],
    });

    this.headerButtons = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['header__buttons'],
    });

    this.garageButton = new ButtonElement(this.headerButtons.node, {
      tagName: 'button',
      classList: ['button'],
      content: 'button',
    });

    this.winnersButton = new ButtonElement(this.headerButtons.node, {
      tagName: 'button',
      classList: ['button'],
      content: 'button',
    });

    this.headerLogo = new DOMElement(this.container.node, {
      tagName: 'h1',
      classList: ['header__logo'],
      content: 'project-name',
    });
  }
}
