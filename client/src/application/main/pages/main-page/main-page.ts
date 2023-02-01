import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';
import PremierePreview from '../../components/main-page/premiere-preview/premiere-preview';

export default class MainPage extends Page {
  private premiereContainer: DOMElement;

  constructor(id: string) {
    super(id);

    this.premiereContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['main-page__premiere'],
    });

    this.render();
  }

  public render() {
    new PremierePreview(this.premiereContainer.node);
    // какие-то еще коммпоненты
  }
}
