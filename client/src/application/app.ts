import { Header } from './core/components/header/header';
import { Main } from './core/components/main-container/main-container';
import { Router } from './shared/services/router/router';
import { routes } from './shared/services/router/routes';
import { state } from './shared/services/state';

class App {
  private header: Header;

  private main: Main;

  private router: Router | null;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);

    this.router = null;
  }

  public async start() {
    const currPage = state.getCarsPage();
    await state.updateGarageState(currPage);
    this.router = new Router(routes, this.main.container, [this.header.garageButton, this.header.winnersButton]);
  }
}

export default App;
