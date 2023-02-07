import './block-movie.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
// import ImageElement from '../../../shared/components/base-elements/image-element';
// import LinkElement from '../../../shared/components/base-elements/link-element';
// import storage from '../../../shared/components/local-storage';
import state from '../../../shared/services/state';
import BlockMovieCard from './block-movie-card';

export default class BlockMovieData {
  private blockMovie: DOMElement;

  private page: string;

  constructor(container: HTMLElement, page: string) {
    this.page = page;

    // const filmdata = this.page === 'recomend' ? state.allData.films : state.allData.best;
    // console.log(filmdata);

    this.blockMovie = new DOMElement(container, {
      tagName: 'div',
      classList: ['block-movie__cards'],
    });

    this.renderCard();
  }

  private renderCard() {
    const container = this.blockMovie.node;
    container.innerHTML = '';
    const filmdata = this.page === 'recomend' ? state.allData.films : state.allData.best;

    filmdata.map((item, index) => new BlockMovieCard(container, item, index));
  }
}
