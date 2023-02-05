import ButtonElement from '../../../shared/components/base-elements/button-element';
import DOMElement from '../../../shared/components/base-elements/dom-element';
import InputElement from '../../../shared/components/base-elements/input-element';

export default class authForm extends DOMElement {
    private loginInput: InputElement;
    private passwordInput: InputElement;
    private authButton: ButtonElement;
    private isRegister: boolean;

    constructor(parentNode: HTMLElement, isRegister: boolean) {
        super(parentNode, { tagName: 'div', classList: ['auth__form']});
        this.isRegister = isRegister;
        this.loginInput = new InputElement(this.node, { tagName: 'input', type: 'text'});
        this.passwordInput = new InputElement(this.node, { tagName: 'input', type: 'password' });
        this.authButton = new ButtonElement(this.node, { tagName: 'button', classList: ['auth__button']});
    }
}

