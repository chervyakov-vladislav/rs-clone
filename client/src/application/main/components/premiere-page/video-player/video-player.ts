import './video-player.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import IFrameElement from '../../../../shared/components/base-elements/iframe-element';
import ytPlayerService from '../../../services/premiere-page/videoplayer/video-player.service';
import PlayerControls from './controls/controls';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import state from '../../../../shared/services/state';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import { IFilmData } from '../../../../shared/models/response-data';

export default class VideoPlayer extends DOMElement {
  private iFrameContainer: DOMElement;

  private controls: PlayerControls;

  private iFrame: IFrameElement;

  private cover: DOMElement;

  private coverImage: ImageElement;

  private playButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['video-player'],
    });

    const premierState = state.allData.premiere as IFilmData;

    this.controls = new PlayerControls(this.node);

    this.iFrameContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['video-player__player'],
    });

    this.iFrame = new IFrameElement(this.iFrameContainer.node, {
      tagName: 'iframe',
      classList: ['video-player__iframe'],
      id: 'premiere-page-player',
      src: ytPlayerService.getIFrameLink(),
    });

    this.cover = new DOMElement(this.iFrameContainer.node, {
      tagName: 'div',
      classList: ['video-player__cover-container'],
    });

    this.coverImage = new ImageElement(this.cover.node, {
      tagName: 'img',
      src: premierState.coverUrl,
      classList: ['video-player__cover-image'],
    });

    this.playButton = new ButtonElement(this.cover.node, {
      tagName: 'button',
      classList: ['video-player__play'],
    });
  }
}
