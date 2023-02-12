import state from '../../../shared/services/state';
import SuggestCard from '../../components/header/search/search-suggest/card/suggest-card';
import NotFound from '../../components/header/search/search-suggest/not-found/not-found';
import Suggest from '../../components/header/search/search-suggest/search-suggest';

class SuggestObserver {
  private subscribers: Suggest[];

  private container: HTMLElement | null = null;

  constructor() {
    this.subscribers = [];
  }

  public register(observer: Suggest) {
    this.subscribers.push(observer);
  }

  public setContainer(elem: HTMLElement) {
    this.container = elem;
  }

  public unregister(observer: Suggest) {
    this.subscribers = this.subscribers.filter((el) => el !== observer);
  }

  public render() {
    const data = state.getSearchResult().films.slice(0, 5);
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    if (data.length === 0) {
      container.append(new NotFound(container).node);
    } else {
      data.forEach((item) => new SuggestCard(container, item));
    }
  }
}

const suggestObserver = new SuggestObserver();
export default suggestObserver;
