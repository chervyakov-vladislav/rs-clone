import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';

export default class AuthForm extends DOMElement {
  private logedInfo: DOMElement;

  private logoutButton: ButtonElement;

  constructor(parentNode: HTMLElement, name: string) {
    super(parentNode, { tagName: 'div', classList: ['auth__form'] });
    this.logedInfo = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['auth__logout-info'],
      content: `Вы вошли под учётной записью ${name}`,
    });
    this.logoutButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['auth__logout-button'],
      content: 'Выйти',
    });

    this.logoutButton.node.addEventListener('click', () => {
      console.log('logout');
    });
  }
}
