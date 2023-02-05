import { ScriptOptions } from '../../models/base-elements';
import DOMElement from './dom-element';

export default class ScriptElement extends DOMElement {
  constructor(parentNode: HTMLElement | null, options: ScriptOptions) {
    super(parentNode, {
      tagName: options.tagName,
      classList: options.classList,
      content: options.content,
    });

    this.node.setAttribute('src', options.src);

    if (options.id) {
      this.node.id = options.id;
    }
  }
}
