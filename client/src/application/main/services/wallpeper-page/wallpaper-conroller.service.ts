import state from '../../../shared/services/state';
import ImageModal from '../../components/wallpapers-page/modal/image-modal/image-modal';
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

  private prevBtn: HTMLButtonElement;

  private counterText: HTMLElement;

  private nextBtn: HTMLButtonElement;

  private openBtn: HTMLAnchorElement;

  private modalImageContainer: HTMLElement;

  private imageModal: ImageModal | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    this.counterText = document.createElement('button');
    this.openBtn = document.createElement('a');
    this.modalImageContainer = document.createElement('div');
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

  public registerControls() {
    this.prevBtn = (this.modal as WallpaperModal).controls.prevBtn.node as HTMLButtonElement;
    this.counterText = (this.modal as WallpaperModal).controls.counter.node;
    this.nextBtn = (this.modal as WallpaperModal).controls.nextBtn.node as HTMLButtonElement;
    this.modalImageContainer = (this.modal as WallpaperModal).imageContainer.node;
    this.openBtn = (this.modal as WallpaperModal).links.openLink.node as HTMLAnchorElement;
  }

  public renderGrid() {
    const data = state.getMoviePagePosters();
    this.container.innerHTML = '';

    data.photoBank.forEach((cardInfo, index) => {
      this.card = new ImageCard(this.container, cardInfo);
      this.cardCollection.push(this.card.node);

      this.card.node.addEventListener('click', () => {
        this.modal = new WallpaperModal(document.body);
        this.registerControls();
        this.counterText.innerHTML = `${index + 1}/${this.size}`;
        this.openBtn.href = data.photoBank[index].imageUrl;
        this.renderModelImages();
      });
    });
    this.size = this.cardCollection.length;
  }

  private renderModelImages() {
    const data = state.getMoviePagePosters();
    data.photoBank.forEach((cardInfo, index) => {
      this.imageModal = index < 2 ? new ImageModal(this.modalImageContainer as HTMLElement, cardInfo) : null;
    });
  }
}

const wallpepersController = new WallpepersController();
export default wallpepersController;
