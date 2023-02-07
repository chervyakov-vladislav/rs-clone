import DOMElement from '../../shared/components/base-elements/dom-element';
import { previousPageInfoInterface } from '../../shared/models/state';
import state from '../../shared/services/state';

class MenuObserver {
  private subscribers: Record<string, DOMElement>;

  private pageData: previousPageInfoInterface;

  constructor() {
    this.pageData = state.getPreviousPageInfo();
    this.subscribers = {};
  }

  public setPage() {
    this.pageData = state.getPreviousPageInfo();
    this.setStyles();
  }

  public register(id: string, observer: DOMElement) {
    this.subscribers[id] = observer;
  }

  public unregister(id: string) {
    const keyArr = Object.keys(this.subscribers);
    const newSubscribers: Record<string, DOMElement> = {};
    keyArr.forEach((key) => {
      if (key !== id) {
        newSubscribers[key] = this.subscribers[key];
      }
    });
    this.subscribers = newSubscribers;
  }

  private setStyles() {
    const { currentPageID } = this.pageData;
    const keyArr = Object.keys(this.subscribers);
    keyArr.forEach((key) => {
      if (key === currentPageID) {
        this.subscribers[key].node.classList.add('side-menu__item--active');
      } else {
        this.subscribers[key].node.classList.remove('side-menu__item--active');
      }
    });
  }
}

const menuObserver = new MenuObserver();
export default menuObserver;
