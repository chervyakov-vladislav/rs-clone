import Page from '../../../shared/components/page';
import ImageList from '../../components/wallpapers-page/image-list';

export default class WallpapersPage extends Page {
  private imageList: ImageList;

  constructor(id: string) {
    super(id);

    this.imageList = new ImageList(this.node);
  }
}
