import './video-player.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import IFrameElement from '../../../../shared/components/base-elements/iframe-element';
import ytPlayerService from '../../../services/premiere-page/videoplayer/video-player.service';

export default class VideoPlayer extends DOMElement {
  private iFrameContainer: DOMElement;

  private iFrame: IFrameElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['video-player'],
      content: 'video-player',
    });

    this.iFrameContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['video-player__player'],
    });

    this.iFrame = new IFrameElement(this.iFrameContainer.node, {
      tagName: 'div',
      id: 'premiere-page-youtubeplayer',
    });

    ytPlayerService.appendIFrame();
  }
}
