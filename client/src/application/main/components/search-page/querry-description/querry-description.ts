import './querry-description.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import state from '../../../../shared/services/state';

export default class QuerryDescription extends DOMElement {
  private title: DOMElement;

  private countTitle: DOMElement;

  private count: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['querry-desc'],
    });
    // проверяем искали через обычный поиск или через расширенный, берем нужную дату
    const data = state.getSearchKeyword();

    this.title = new DOMElement(this.node, {
      tagName: 'h1',
      classList: ['querry-desc__title'],
      content: this.isEmptyKeyword(data.keyword),
    });

    this.countTitle = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['querry-desc__count-title'],
      content: 'Количество фильмов: ',
    });

    this.count = new DOMElement(this.countTitle.node, {
      tagName: 'span',
      classList: ['querry-desc__count'],
      content: data.searchFilmsCountResult.toString(),
    });
    // если есть параметры запроса добавляем строку с параметрами
  }

  private isEmptyKeyword(value: string) {
    return value.length > 0 ? `Вы искали: ${value}` : 'К сожалению, по вашему запросу ничего не найдено...';
  }
}
