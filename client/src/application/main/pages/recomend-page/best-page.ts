import './recomend-page.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import BlockMovieData from '../../components/recomend-page/block-movie';

export default class BestPage extends Page {
  private bestContainer: DOMElement;

  private bestTitle: DOMElement;

  private movie: BlockMovieData | null;

  constructor(id: string) {
    super(id);

    this.bestContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['best-page__movie'],
    });

    this.bestTitle = new DOMElement(this.bestContainer.node, {
      tagName: 'h2',
      classList: ['block-movie__title'],
      content: 'Лучшие фильмы',
    });

    this.movie = null;

    this.render();
  }

  public render() {
    this.movie = new BlockMovieData(this.bestContainer.node, 'best');
  }
}
