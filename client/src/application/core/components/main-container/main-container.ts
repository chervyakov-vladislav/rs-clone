import './main-container.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import SideMenu from './side-menu/side-menu';

export class Main extends DOMElement {
  private mainContainer: DOMElement;

  private sideMenu: DOMElement;

  public container: HTMLElement;

  private sidemenu: SideMenu;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'main',
      classList: ['main'],
    });

    this.mainContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'main__container'],
    });
    this.container = this.mainContainer.node;

    this.sideMenu = new DOMElement(this.mainContainer.node, {
      tagName: 'nav',
      classList: ['nav__side-menu'],
    });

    this.sidemenu = new SideMenu(this.sideMenu.node);
  }
}
