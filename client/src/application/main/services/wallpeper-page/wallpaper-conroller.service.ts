import apiHelpers from '../../../shared/services/api/api-helpers.service';
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

  private prevBtn: HTMLButtonElement;

  private counterText: HTMLElement;

  private nextBtn: HTMLButtonElement;

  private openBtn: HTMLAnchorElement;

  private modalImageContainer: HTMLElement;

  private imageModal: ImageModal | null = null;

  private imageModalArray: ImageModal[];

  private prevHiddenImagenodes: ImageModal[];

  private prevShowingImagenodes: ImageModal[];

  private activeImageNode: ImageModal[];

  private nextShowingImagenodes: ImageModal[];

  private nextHiddenImagenodes: ImageModal[];

  constructor() {
    this.container = document.createElement('div');
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    this.counterText = document.createElement('button');
    this.openBtn = document.createElement('a');
    this.modalImageContainer = document.createElement('div');
    this.modal = null;

    this.imageModalArray = [];
    this.prevHiddenImagenodes = [];
    this.prevShowingImagenodes = [];
    this.activeImageNode = [];
    this.nextShowingImagenodes = [];
    this.nextHiddenImagenodes = [];

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
    this.cardCollection = [];
    this.resetModalImagesArrs();
    data.photoBank.forEach((cardInfo, index) => {
      this.card = new ImageCard(this.container, cardInfo);
      this.cardCollection.push(this.card.node);

      this.card.node.addEventListener('click', () => {
        this.resetModalImagesArrs();
        this.modal = new WallpaperModal(document.body);
        this.registerControls();
        this.counterText.innerHTML = `${index + 1}/${state.getMoviePagePosters().photoBank.length}`;
        this.currentIndex = index;
        this.openBtn.href = data.photoBank[index].imageUrl;
        this.renderModelImages();
      });
    });
  }

  private renderModelImages() {
    const data = state.getMoviePagePosters();
    data.photoBank.forEach((cardInfo, index) => {
      this.imageModal = new ImageModal(this.modalImageContainer as HTMLElement, cardInfo);
      (this.imageModal as ImageModal).node.style.transition = '';
      const elemData = this.cardCollection[index].getBoundingClientRect();
      this.imageModal.node.style.width = `${elemData.width}px`;
      this.imageModal.node.style.height = `${elemData.height}px`;
      this.imageModal.node.style.overflow = 'hidden';
      this.imageModal.node.style.transform = `translate3d(${elemData.left.toFixed(1)}px, ${(elemData.top - 70).toFixed(
        1
      )}px, 0)`;
      setTimeout(() => {
        (this.imageModal as ImageModal).node.style.transition = `transform .7s, opacity .7s`;
        this.setCurrentState();
      });
      this.imageModalArray.push(this.imageModal);
    });
  }

  private setCurrentState() {
    apiHelpers.debounce(() => {
      this.imageModalArray.forEach((elem, index) => {
        if (index + this.showingCount < this.currentIndex) {
          this.prevHiddenImagenodes.unshift(elem);
        } else if (index < this.currentIndex) {
          this.prevShowingImagenodes.unshift(elem); // prevShowingImagenodes
        } else if (index === this.currentIndex) {
          this.activeImageNode.push(elem); // activeImageNode
        } else if (index <= this.currentIndex + this.showingCount) {
          this.nextShowingImagenodes.push(elem); // nextShowingImagenodes
        } else {
          this.nextHiddenImagenodes.push(elem); // nextHiddenImagenodes
        }
      });
    }, 1)();
  }

  private resetModalImagesArrs() {
    this.imageModalArray = [];
    this.prevHiddenImagenodes = [];
    this.prevShowingImagenodes = [];
    this.activeImageNode = [];
    this.nextShowingImagenodes = [];
    this.nextHiddenImagenodes = [];
  }
}

const wallpepersController = new WallpepersController();
export default wallpepersController;
