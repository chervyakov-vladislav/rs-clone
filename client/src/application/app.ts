import Header from './core/components/header/header';
import Main from './core/components/main-container/main-container';
import mainRouter from './shared/services/router/router';

class App {
  private header: Header;

  private main: Main;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
  }

  public async start() {
    
  }
}

export default App;
