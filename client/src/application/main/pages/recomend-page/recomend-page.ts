import './recomend-page.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import BlockMovieData from '../../components/recomend-page/block-movie';

export default class RecomendPage extends Page {
  private recomendContainer: DOMElement;

  private recomendTitle: DOMElement;

  private movie: BlockMovieData | null;

  constructor(id: string) {
    super(id);

    this.recomendContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['recomend-page__movie'],
    });

    this.recomendTitle = new DOMElement(this.recomendContainer.node, {
      tagName: 'h2',
      classList: ['block-movie__title'],
      content: 'Рекомендации',
    });

    this.movie = null;

    this.render();
  }

  public render() {
    this.movie = new BlockMovieData(this.recomendContainer.node, 'recomend');
  }
}
