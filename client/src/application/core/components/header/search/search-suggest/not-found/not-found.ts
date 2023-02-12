import './not-found.scss';
import DOMElement from '../../../../../../shared/components/base-elements/dom-element';

export default class NotFound extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'li',
      classList: ['not-found'],
      content: 'Ничего не найдено',
    });
  }
}
