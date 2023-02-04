import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import PremierePreview from '../../components/main-page/premiere-preview/premiere-preview';
import RecomendSection from '../../components/main-page/recomend/recomend';

export default class MainPage extends Page {
  private premiereContainer: DOMElement;

  private premiere: PremierePreview | null;

  private recomend: RecomendSection | null;

  constructor(id: string) {
    super(id);

    this.premiereContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['main-page__premiere'],
    });

    this.premiere = null;
    this.recomend = null;

    this.render();
  }

  public render() {
    this.premiere = new PremierePreview(this.premiereContainer.node);
    this.recomend = new RecomendSection(this.premiereContainer.node);
  }
}
