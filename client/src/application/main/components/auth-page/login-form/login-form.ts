// import DOMElement from '../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../shared/components/base-elements/form-element';

export default class LoginForm extends FormElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'form',
      action: '#auth',
    });
  }
}