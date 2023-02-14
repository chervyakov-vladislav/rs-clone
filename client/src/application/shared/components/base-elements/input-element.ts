import DOMElement from './dom-element';
import { InputOptions } from '../../models/base-elements';

export default class InputElement extends DOMElement {
  private _value = '';

  public inputNode: HTMLInputElement;

  constructor(parentNode: HTMLElement | null, options: InputOptions) {
    super(parentNode, {
      tagName: options.tagName,
      classList: options.classList,
      content: options.content,
    });
    this.inputNode = this.node as HTMLInputElement;

    if (options.type) {
      this.inputNode.type = options.type;
    }

    if (options.name) {
      this.inputNode.name = options.name;
    }

    if (options.placeholder) {
      this.inputNode.placeholder = options.placeholder;
    }

    if (options.required) {
      this.inputNode.required = options.required;
    }

    if (options.step) {
      this.inputNode.step = options.step;
    }

    if (options.selected) {
      (this.inputNode as HTMLElement as HTMLOptionElement).selected = true;
    }

    if (options.min) {
      this.inputNode.min = options.min;
    }

    if (options.max) {
      this.inputNode.max = options.max;
    }

    if (options.value) {
      this.inputNode.value = options.value;
      this._value = options.value;
    }

    if (options.checked) {
      this.inputNode.checked = options.checked;
    }

    if (options.readonly) {
      this.inputNode.readOnly = options.readonly;
    }

    if (options.accept) {
      (this.node as HTMLInputElement).accept = options.accept;
    }
  }

  public set value(val: unknown) {
    if (typeof val === 'string') this._value = val;
    if (typeof val === 'number') this._value = val.toString();
    this.inputNode.value = this._value;
  }

  public get value(): string {
    return this._value;
  }
}
