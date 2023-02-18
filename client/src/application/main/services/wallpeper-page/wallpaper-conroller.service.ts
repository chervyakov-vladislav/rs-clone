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
    this.imageModalArray = [];
    this.resetModalImagesArrs();
    data.photoBank.forEach((cardInfo, index) => {
      this.card = new ImageCard(this.container, cardInfo);
      this.cardCollection.push(this.card.node);

      this.card.node.addEventListener('click', () => {
        this.cardCollection.forEach((elem) => {
          elem.style.opacity = '0';
        });
        this.imageModalArray = [];
        this.resetModalImagesArrs();
        this.modal = new WallpaperModal(document.body);
        this.modal.controls.close.node.addEventListener('click', () => {
          this.cardCollection.forEach((elem) => {
            elem.style.opacity = '1';
          });
        });
        this.registerControls();
        this.currentIndex = index;
        this.renderModelImages();
        this.nextBtn.addEventListener('click', () => {
          if (this.currentIndex < state.getMoviePagePosters().photoBank.length) {
            this.currentIndex += 1;
            this.shitchChanges();
          }
        });
        this.prevBtn.addEventListener('click', () => {
          if (this.currentIndex > 0) {
            this.currentIndex -= 1;
            this.shitchChanges();
          }
        });
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
        this.shitchChanges();
      });
      this.imageModalArray.push(this.imageModal);
    });
  }

  private shitchChanges() {
    apiHelpers.debounce(() => {
      this.setCurrentState(); // засетить картинки по массивам и отрисовать
      this.switchDisabledNav(); // засетить состояние кнопок
      this.changeCounter(); // обновление счетчика
      this.changeLink(); // обновление ссылки
    }, 1)();
  }

  private switchDisabledNav() {
    if (this.currentIndex === 0 && !this.prevBtn.disabled) {
      this.prevBtn.disabled = true;
    }

    if (this.currentIndex > 0 && this.prevBtn.disabled) {
      this.prevBtn.disabled = false;
    }

    if (this.currentIndex === state.getMoviePagePosters().photoBank.length - 1 && !this.nextBtn.disabled) {
      this.nextBtn.disabled = true;
    }

    if (this.currentIndex < state.getMoviePagePosters().photoBank.length - 1 && this.nextBtn.disabled) {
      this.nextBtn.disabled = false;
    }
  }

  private changeCounter() {
    this.counterText.innerHTML = `${this.currentIndex + 1}/${state.getMoviePagePosters().photoBank.length}`;
  }

  private changeLink() {
    this.openBtn.href = state.getMoviePagePosters().photoBank[this.currentIndex].imageUrl;
  }

  private setCurrentState() {
    this.resetModalImagesArrs();
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

    if (this.prevShowingImagenodes[0]) {
      this.setImagestyles(this.prevShowingImagenodes[0].node, {
        top: modalHeight - imageHeight,
        left: 0.32 * modalWidth,
        zIndex: 4,
        opacity: 0.4,
        scale: 0.75,
      });
    }

    if (this.prevShowingImagenodes[1]) {
      this.setImagestyles(this.prevShowingImagenodes[1].node, {
        top: 0.405 * modalHeight,
        left: 0.11 * modalWidth,
        zIndex: 3,
        opacity: 0.3,
        scale: 0.6,
      });
    }

    if (this.prevShowingImagenodes[2]) {
      this.setImagestyles(this.prevShowingImagenodes[2].node, {
        top: 0.095 * modalHeight,
        left: 0.17 * modalWidth,
        zIndex: 2,
        opacity: 0.2,
        scale: 0.5,
      });
    }

    if (this.prevShowingImagenodes[3]) {
      this.setImagestyles(this.prevShowingImagenodes[3].node, {
        top: -0.3 * imageHeight,
        left: 0.31 * modalWidth,
        zIndex: 1,
        opacity: 0.1,
        scale: 0.4,
      });
    }

    // active image
    if (this.activeImageNode[0]) {
      this.setImagestyles(this.activeImageNode[0].node, {
        top: (modalHeight - imageHeight) / 2,
        left: (modalWidth - imageWidth) / 2,
        zIndex: 5,
        opacity: 1,
        scale: 1.5,
      });
    }

    // next
    if (this.nextShowingImagenodes[0]) {
      this.setImagestyles(this.nextShowingImagenodes[0].node, {
        top: 0,
        left: 0.52 * modalWidth,
        zIndex: 4,
        opacity: 0.4,
        scale: 0.75,
      });
    }

    if (this.nextShowingImagenodes[1]) {
      this.setImagestyles(this.nextShowingImagenodes[1].node, {
        top: 0.12 * modalHeight,
        left: 0.73 * modalWidth,
        zIndex: 3,
        opacity: 0.3,
        scale: 0.6,
      });
    }

    if (this.nextShowingImagenodes[2]) {
      this.setImagestyles(this.nextShowingImagenodes[2].node, {
        top: 0.43 * modalHeight,
        left: 0.67 * modalWidth,
        zIndex: 2,
        opacity: 0.2,
        scale: 0.5,
      });
    }

    if (this.nextShowingImagenodes[3]) {
      this.setImagestyles(this.nextShowingImagenodes[3].node, {
        top: 0.67 * modalHeight,
        left: 0.53 * modalWidth,
        zIndex: 1,
        opacity: 0.1,
        scale: 0.4,
      });
    }

    this.nextHiddenImagenodes.forEach((item) => {
      this.setImagestyles(item.node, {
        top: 1.5 * modalHeight,
        left: 0.53 * modalWidth,
        opacity: 0.1,
        zIndex: 1,
        scale: 0.4,
      });
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
    this.prevHiddenImagenodes = [];
    this.prevShowingImagenodes = [];
    this.activeImageNode = [];
    this.nextShowingImagenodes = [];
    this.nextHiddenImagenodes = [];
  }
}

const wallpepersController = new WallpepersController();
export default wallpepersController;
