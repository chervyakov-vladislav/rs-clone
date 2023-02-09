import state from '../../../../shared/services/state';
import SearchListCard from '../../../components/search-page/search-list/card/card';

class RenderCards {
  private container: HTMLElement | null = null;

  public setContainer(elem: HTMLElement) {
    this.container = elem;
  }

  public render() {
    const data = state.getSearchKeyword().films;
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    if (data.length > 0) {
      data.forEach((item, index) => new SearchListCard(container, item, index + 1));
    }
  }
}

const renderCards = new RenderCards();
export default renderCards;
