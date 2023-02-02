import Header from './core/components/header/header';
import Main from './core/components/main-container/main-container';
import YoutubeAPI from './core/components/scripts/youtube-api';
import mainRouter from './shared/services/router/router';

class App {
  private header: Header;

  private main: Main;

  private ytApi: YoutubeAPI;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.ytApi = new YoutubeAPI(document.body);
  }

  public async start() {
    this.main.container.append(mainRouter.node);
  }
}

export default App;
