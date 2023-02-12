import state from '../../../../shared/services/state';
import SearchListCard from '../../../components/common/card/card';

class RenderCards {
  private container: HTMLElement | null = null;

  public setContainer(elem: HTMLElement) {
    this.container = elem;
  }

  public render() {
    const data = state.getSearchResult().films;
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    if (data.length > 0) {
      data.forEach((item, index) => new SearchListCard(container, item, index + 1));
    }
  }

  public append() {
    const data = state.getSearchResult().films;
    const container = this.container as HTMLElement;
    if (data.length > 0) {
      data.forEach((item, index) => new SearchListCard(container, item, index + 1));
    }
  }
}

const renderCards = new RenderCards();
export default renderCards;
