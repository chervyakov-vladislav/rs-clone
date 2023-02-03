import './controls.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import PlayerIcon from '../player-icons/player-icons';

export default class PlayerControls extends DOMElement {
  private timelineContainer: DOMElement;

  private controlsContiner: DOMElement;

  public playPauseButton: ButtonElement;

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
  }
}
