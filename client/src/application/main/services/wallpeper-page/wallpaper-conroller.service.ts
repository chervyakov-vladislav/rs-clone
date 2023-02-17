import state from '../../../shared/services/state';
import WallpaperModal from '../../components/wallpapers-page/modal/modal';
import ImageCard from '../../components/wallpapers-page/wallpaper-card/wallpaper-card';

class WallpepersController {
  private container: HTMLElement;

  private modal: WallpaperModal | null;

  private card: ImageCard;

  private cardCollection: HTMLElement[];

  private minWidth: number;

  private minHeight: number;

  private padding: number;

  private showingCount: number;

  private currentIndex: number;

  private size: number;

  constructor() {
    this.container = document.createElement('div');
    this.modal = null;
    this.card = new ImageCard(this.container, {
      imageUrl: '',
      previewUrl: '',
    });
    this.cardCollection = [];

    this.minWidth = 1000;
    this.minHeight = 600;
    this.padding = 2 * 16;
    this.showingCount = 4;
    this.currentIndex = 0;

    this.size = 0;
  }

  public registerContainer(elem: HTMLElement) {
    this.container = elem;
  }

  public renderGrid() {
    const data = state.getMoviePagePosters();
    this.container.innerHTML = '';
    data.photoBank.forEach((cardInfo) => {
      this.card = new ImageCard(this.container, cardInfo);
      this.cardCollection.push(this.card.node);

      this.card.node.addEventListener('click', () => {
        this.modal = new WallpaperModal(document.body);
      });
    });
    this.size = this.cardCollection.length;
  }
}

const wallpepersController = new WallpepersController();
export default wallpepersController;
