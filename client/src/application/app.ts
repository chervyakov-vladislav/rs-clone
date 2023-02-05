import Header from './core/components/header/header';
import Main from './core/components/main-container/main-container';
import Router from './shared/services/router/router';
import state from './shared/services/state';

class App {
  private header: Header;

  private main: Main;

  private router: Router | null = null;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
  }

  public async start() {
    await state.loadAppData();
    this.router = new Router(this.main.container);
  }
}

export default App;
