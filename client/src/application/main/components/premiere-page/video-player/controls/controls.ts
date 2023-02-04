import './controls.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import PlayerIcon from '../player-icons/player-icons';
import InputElement from '../../../../../shared/components/base-elements/input-element';
import state from '../../../../../shared/services/state';

export default class PlayerControls extends DOMElement {
  private timelineContainer: DOMElement;

  private controlsContiner: DOMElement;

  public playPauseButton: ButtonElement;

  public muteButton: ButtonElement;

  public inputVolume: InputElement;

  public duration: DOMElement;

  public totalTime: DOMElement;

  public fullScreenButton: ButtonElement;

  constructor(parantNode: HTMLElement) {
    super(parantNode, {
      tagName: 'div',
      classList: ['controls'],
    });

    this.timelineContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['controls__timeline-container'],
    });

    this.controlsContiner = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['controls__container'],
    });

    this.playPauseButton = new ButtonElement(this.controlsContiner.node, {
      tagName: 'button',
      classList: ['controls__play-button'],
    });
    this.playPauseButton.node.innerHTML = PlayerIcon.playButton;

    this.muteButton = new ButtonElement(this.controlsContiner.node, {
      tagName: 'button',
      classList: ['controls__mute-button'],
    });
    this.muteButton.node.innerHTML = PlayerIcon.volume;

    this.inputVolume = new InputElement(this.controlsContiner.node, {
      tagName: 'input',
      classList: ['controls__volume-input'],
      type: 'range',
      min: '0',
      max: '100',
      step: 'any',
    });

    state.setPlayerState({
      totalTime: '0 : 00',
      currentTime: '0 : 00',
    });

    this.duration = new DOMElement(this.controlsContiner.node, {
      tagName: 'div',
      classList: ['controls__duration'],
      content: state.getPlayerState().currentTime,
    });

    this.totalTime = new DOMElement(this.controlsContiner.node, {
      tagName: 'div',
      classList: ['controls__total-time'],
      content: state.getPlayerState().totalTime,
    });

    this.fullScreenButton = new ButtonElement(this.controlsContiner.node, {
      tagName: 'button',
      classList: ['controls__fullscreen'],
    });
    this.fullScreenButton.node.innerHTML = PlayerIcon.fullScreen;
  }
}
