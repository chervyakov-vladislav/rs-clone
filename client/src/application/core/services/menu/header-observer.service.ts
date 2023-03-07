import DOMElement from '../../../shared/components/base-elements/dom-element';

class HeaderObserver {
  private subscribers: DOMElement[];

  private headerInput: HTMLInputElement | null = null;

  constructor() {
    this.subscribers = [];
  }

  public register(observer: DOMElement) {
    this.subscribers.push(observer);
  }

  public unregister(observer: DOMElement) {
    this.subscribers = this.subscribers.filter((el) => el !== observer);
  }

  public addInput(input: HTMLInputElement) {
    this.headerInput = input;
  }

  public clearInput() {
    const input = this.headerInput as HTMLInputElement;
    input.value = '';
  }

  public closeAll() {
    this.subscribers.forEach((elem) => {
      elem.node.remove();
      this.unregister(elem);
    });
  }
}

const headerObserver = new HeaderObserver();
export default headerObserver;
