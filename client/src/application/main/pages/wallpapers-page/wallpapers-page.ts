import './wallpapers-page.scss';
import ButtonElement from '../../../shared/components/base-elements/button-element';
import Page from '../../../shared/components/page';
import ImageList from '../../components/wallpapers-page/image-list';
import wallpepersController from '../../services/wallpeper-page/wallpaper-conroller.service';

export default class WallpapersPage extends Page {
  private imageList: ImageList;

  private goBackBtn: ButtonElement;

  constructor(id: string) {
    super(id);

    this.goBackBtn = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['wallpapers-page__back'],
      content: 'Назад к фильму',
    });
    wallpepersController.registerBackButton(this.goBackBtn.node as HTMLButtonElement);

    this.imageList = new ImageList(this.node);
  }
}
