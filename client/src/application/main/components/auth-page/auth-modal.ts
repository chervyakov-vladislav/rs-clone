import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import ImageElement from '../../../shared/components/base-elements/image-element';
import AuthForm from './auth-form';

export default class AuthModal extends DOMElement {
  private logoImg: ImageElement;

  private backButton: ButtonElement;

  private form: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, { tagName: 'div', classList: ['auth__modal'] });

    this.logoImg = new ImageElement(this.node, {
      tagName: 'img',
      classList: ['auth__modal-logo'],
      src: '',
      alt: 'Kionopoisk logo',
    });

    this.backButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['auth__button-back'],
      content: '<',
    });
    this.form = new AuthForm(this.node);
  }
}
