import state from '../../../shared/services/state';
import ImageCard from '../../components/wallpapers-page/wallpaper-card/wallpaper-card';

class WallpepersController {
  private container: HTMLElement;

  private card: ImageCard;

  constructor() {
    this.container = document.createElement('div');
    this.card = new ImageCard(this.container, {
      imageUrl: '',
      previewUrl: '',
    });
  }

  public registerContainer(elem: HTMLElement) {
    this.container = elem;
  }

  public renderGrid() {
    const data = state.getMoviePagePosters();
    console.log(data.photoBank);
    this.container.innerHTML = '';
    data.photoBank.forEach((cardInfo) => {
      this.card = new ImageCard(this.container, cardInfo);
    });
  }
}

const wallpepersController = new WallpepersController();
export default wallpepersController;
