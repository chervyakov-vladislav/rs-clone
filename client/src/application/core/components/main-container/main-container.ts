import './main-container.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import SideMenu from './side-menu/side-menu';
import headerObserver from '../../services/header-observer.service';

export default class Main extends DOMElement {
  private mainContainer: DOMElement;

  private navigation: DOMElement;

  public container: HTMLElement;

  private sideMenu: SideMenu;

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

    this.navigation = new DOMElement(this.mainContainer.node, {
      tagName: 'nav',
      classList: ['nav'],
    });
    this.sideMenu = new SideMenu(this.navigation.node);
    document.body.addEventListener('click', (e) => {
      const { target } = e;
      if (
        (target as HTMLElement).closest('.search') === null &&
        (target as HTMLElement).closest('.search-suggest') === null &&
        (target as HTMLElement).closest('.login') === null &&
        (target as HTMLElement).closest('.login-menu') === null
      ) {
        headerObserver.closeAll();
      }
    });
  }
}
