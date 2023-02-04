import './video-player.scss';
import './player-icons/player-icons.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import IFrameElement from '../../../../shared/components/base-elements/iframe-element';
import ytPlayerService from '../../../services/premiere-page/videoplayer/video-player.service';
import PlayerControls from './controls/controls';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import state from '../../../../shared/services/state';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import { IFilmData } from '../../../../shared/models/response-data';
import PlayerIcon from './player-icons/player-icons';

export default class VideoPlayer extends DOMElement {
  private iFrameContainer: DOMElement;

  private controls: PlayerControls;

  private iFrame: IFrameElement;

  private cover: DOMElement;

  public coverImage: ImageElement;

  private playButton: ButtonElement;

  private pauseButton: ButtonElement;

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
      tagName: 'div',
      id: 'premiere-page-player',
    });
    ytPlayerService.initPlayer(this.iFrame.node, this.iFrameContainer.node);

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
    this.playButton.node.innerHTML = PlayerIcon.playButton;

    this.pauseButton = new ButtonElement(this.cover.node, {
      tagName: 'button',
      classList: ['video-player__pause'],
    });
    this.pauseButton.node.innerHTML = PlayerIcon.pauseButton;

    // запуск видео
    this.playButton.node.addEventListener('click', () => {
      ytPlayerService.togglePlay();
      setTimeout(() => this.coverImage.node.classList.add('video-player__cover-image--active'), 400);
      this.playButton.node.classList.add('video-player__play--active');
      this.pauseButton.node.classList.add('video-player__pause--active');
      this.controls.playPauseButton.node.innerHTML = PlayerIcon.pauseButton;
      state.setPlayerState({
        status: 'play',
      });
    });

    // пауза
    this.pauseButton.node.addEventListener('click', () => {
      ytPlayerService.togglePause();
      this.coverImage.node.classList.remove('video-player__cover-image--active');
      this.playButton.node.classList.remove('video-player__play--active');
      this.pauseButton.node.classList.remove('video-player__pause--active');
      this.controls.playPauseButton.node.innerHTML = PlayerIcon.playButton;
      state.setPlayerState({
        status: 'paused',
      });
    });

    //  Плей пауз на контролах
    this.controls.playPauseButton.node.addEventListener('click', () => {
      const { status } = state.getPlayerState();
      if (status === 'paused') {
        ytPlayerService.togglePlay();
        setTimeout(() => this.coverImage.node.classList.add('video-player__cover-image--active'), 400);
        this.playButton.node.classList.add('video-player__play--active');
        this.pauseButton.node.classList.add('video-player__pause--active');
        this.controls.playPauseButton.node.innerHTML = PlayerIcon.pauseButton;
        state.setPlayerState({
          status: 'play',
        });
      } else {
        ytPlayerService.togglePause();
        this.coverImage.node.classList.remove('video-player__cover-image--active');
        this.playButton.node.classList.remove('video-player__play--active');
        this.pauseButton.node.classList.remove('video-player__pause--active');
        this.controls.playPauseButton.node.innerHTML = PlayerIcon.playButton;
        state.setPlayerState({
          status: 'paused',
        });
      }
    });

    this.controls.fullScreenButton.node.addEventListener('click', () => {
      const { fullScreen } = state.getPlayerState();
      const container = document.querySelector('.main__container') as HTMLElement;
      if (fullScreen === undefined || fullScreen === 'false') {
        state.setPlayerState({
          fullScreen: 'true',
        });
        this.iFrameContainer.node.classList.add('video-player__player--active');
        this.node.classList.add('video-player--active');
        container.classList.add('container--active');
      } else {
        state.setPlayerState({
          fullScreen: 'false',
        });
        this.iFrameContainer.node.classList.remove('video-player__player--active');
        this.node.classList.remove('video-player--active');
        container.classList.remove('container--active');
      }
    });

    this.controls.muteButton.node.addEventListener('click', () => {
      const { muted } = state.getPlayerState();
      if (muted === undefined || muted === 'false') {
        state.setPlayerState({
          muted: 'true',
        });
        this.controls.muteButton.node.innerHTML = PlayerIcon.muted;
        ytPlayerService.mute();
      } else {
        state.setPlayerState({
          muted: 'false',
        });
        this.controls.muteButton.node.innerHTML = PlayerIcon.volume;
        ytPlayerService.unmute();
      }
    });

    this.controls.inputVolume.node.addEventListener('input', (e) => {
      const { value } = e.target as HTMLInputElement;
      const { muted } = state.getPlayerState();
      this.controls.muteButton.node.innerHTML =
        value === '0' || muted === 'true' ? PlayerIcon.muted : PlayerIcon.volume;
      ytPlayerService.setVolume(parseInt(value, 10));
    });

    setInterval(() => {
      const { currentTime, totalTime, finish } = state.getPlayerState();
      this.controls.totalTime.node.innerText = totalTime;
      this.controls.duration.node.innerText = currentTime;
      if (finish === 'true') {
        this.coverImage.node.classList.remove('video-player__cover-image--active');
        this.playButton.node.classList.remove('video-player__play--active');
        this.pauseButton.node.classList.remove('video-player__pause--active');
        this.controls.playPauseButton.node.innerHTML = PlayerIcon.playButton;
        state.setPlayerState({
          status: 'paused',
          finish: 'false',
        });
      }
    }, 500);
  }
}
