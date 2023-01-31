import { Header } from './core/components/header/header';
import { Main } from './core/components/main-container/main-container';

class App {
  private header: Header;

  private main: Main;

  private router: null;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);

    this.router = null;
  }

  public async start() {
    console.log('start');
  }
}

export default App;
