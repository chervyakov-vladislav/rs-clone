import './premiere-page.scss';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import Description from '../../components/premiere-page/description/description';
import VideoPlayer from '../../components/premiere-page/video-player/video-player';

export default class PremierePage extends Page {
  private videoPlayerContainer: DOMElement;

  private videoPlayer: VideoPlayer | null;

  private description: Description | null;

  constructor(id: string) {
    super(id);

    this.videoPlayerContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['premiere-page__video-player'],
    });

    this.videoPlayer = null;
    this.description = null;

    this.render();
  }

  public render() {
    this.videoPlayer = new VideoPlayer(this.videoPlayerContainer.node);
    this.description = new Description(this.node);
  }
}
