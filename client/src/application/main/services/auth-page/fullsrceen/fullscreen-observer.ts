import DOMElement from '../../../../shared/components/base-elements/dom-element';

class FullscreenObserver {
  private subscribers: DOMElement[];

  constructor() {
    this.subscribers = [];
  }

  public register(observer: DOMElement) {
    this.subscribers.push(observer);
  }

  public unregister(observer: DOMElement) {
    this.subscribers = this.subscribers.filter((el) => el !== observer);
  }

  public addFullscreen() {
    this.subscribers.forEach((elem) => elem.node.classList.add('fullscreen'));
  }

  public removeFullscreen() {
    this.subscribers.forEach((elem) => elem.node.classList.remove('fullscreen'));
  }
}

const fullscreenObserver = new FullscreenObserver();
export default fullscreenObserver;
