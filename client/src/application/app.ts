import Header from './core/components/header/header';
import Main from './core/components/main-container/main-container';
import Router from './shared/services/router/router';

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
    // грузим дату
    this.router = new Router(this.main.container);
  }
}

export default App;
