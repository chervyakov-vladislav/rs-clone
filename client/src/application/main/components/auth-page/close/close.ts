import './close.scss';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import SVG from '../../../../shared/components/svg-icons';
import state from '../../../../shared/services/state';

export default class CloseAuth extends ButtonElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'button',
      classList: ['close-auth'],
    });
    this.node.innerHTML = SVG.recomendArrow;
    this.node.addEventListener('click', this.backNavigation);
  }

  private backNavigation() {
    const newAdress = state.getPreviousPageInfo().previousPageHash as string;
    window.location.hash = newAdress;
  }
}
