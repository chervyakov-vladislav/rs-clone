import apiHelpers from '../../../shared/services/api/api-helpers.service';
import state from '../../../shared/services/state';
import ImageModal from '../../components/wallpapers-page/modal/image-modal/image-modal';
import WallpaperModal from '../../components/wallpapers-page/modal/modal';
import ImageCard from '../../components/wallpapers-page/wallpaper-card/wallpaper-card';

interface SetImagestylesInterface {
  top: number;
  left: number;
  opacity: number;
  zIndex: number;
  scale: number;
}

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
        this.cardCollection.forEach((elem) => elem.style.opacity = '0');
        this.resetModalImagesArrs();
        this.modal = new WallpaperModal(document.body);
        this.modal.controls.close.node.addEventListener('click', () => {
          this.cardCollection.forEach((elem) => elem.style.opacity = '1');
        });
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
      (this.imageModal as ImageModal).node.classList.remove('wallpepers-modal-image--transition');
      const elemData = this.cardCollection[index].getBoundingClientRect();
      this.imageModal.node.style.width = `${elemData.width}px`;
      this.imageModal.node.style.height = `${elemData.height}px`;
      this.imageModal.node.style.overflow = 'hidden';
      this.imageModal.node.style.transform = `translate3d(${elemData.left.toFixed(1)}px, ${(elemData.top - 70).toFixed(
        1
      )}px, 0)`;
      setTimeout(() => {
        this.setCurrentState();
      });
      this.imageModalArray.push(this.imageModal);
    });
  }

  private setCurrentState() {
    apiHelpers.debounce(() => {
      this.imageModalArray.forEach((elem, index) => {
        elem.node.classList.add('wallpepers-modal-image--transition');
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

      this.setGallaryStyles();
    }, 1)();
  }

  private setGallaryStyles() {
    const imageWidth = this.cardCollection[0].offsetWidth;
    const imageHeight = this.cardCollection[0].offsetHeight;
    const modalWidth = Math.max(this.minWidth, window.innerWidth);
    const modalHeight = Math.max(this.minHeight, window.innerHeight);

    this.prevHiddenImagenodes.forEach((item) => {
      this.setImagestyles(item.node, {
        top: -1.5 * modalHeight,
        left: 0.31 * modalWidth,
        opacity: 0.1,
        zIndex: 1,
        scale: 0.4,
      });
    });

    this.setImagestyles(this.prevShowingImagenodes[0].node, {
      top: modalHeight - imageHeight,
      left: 0.32 * modalWidth,
      zIndex: 4,
      opacity: 0.4,
      scale: 0.75,
    });

    this.setImagestyles(this.prevShowingImagenodes[1].node, {
      top: 0.405 * modalHeight,
      left: 0.11 * modalWidth,
      zIndex: 3,
      opacity: 0.3,
      scale: 0.6,
    });

    this.setImagestyles(this.prevShowingImagenodes[2].node, {
      top: 0.095 * modalHeight,
      left: 0.17 * modalWidth,
      zIndex: 2,
      opacity: 0.2,
      scale: 0.5,
    });

    this.setImagestyles(this.prevShowingImagenodes[3].node, {
      top: -0.3 * imageHeight,
      left: 0.31 * modalWidth,
      zIndex: 1,
      opacity: 0.1,
      scale: 0.4,
    });
  }

  private setImagestyles(elem: HTMLElement, params: SetImagestylesInterface) {
    if (!elem) return;
    elem.style.transform = `translate3d(${params.left.toFixed(1)}px, ${(params.top - 70).toFixed(1)}px, 0) scale(${
      params.scale
    })`;
    elem.style.opacity = params.opacity.toString();
    elem.style.zIndex = params.zIndex.toString();
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
