import DOMElement from '../../../../shared/components/base-elements/dom-element';
// import state from '../../../../shared/services/state';

export default class ExtendedQuerryDescription extends DOMElement {
  // private title: DOMElement;

  // private countTitle: DOMElement;

  // private count: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['querry-desc'],
    });
    console.log(this.node);
    // const data = state.getSearchResult();

    // this.title = new DOMElement(this.node, {
    //   tagName: 'h1',
    //   classList: ['querry-desc__title'],
    //   content: this.isEmptyKeyword(data.keyword),
    // });

    // this.countTitle = new DOMElement(this.node, {
    //   tagName: 'p',
    //   classList: ['querry-desc__count-title'],
    //   content: 'сколько найдено: ',
    // });

    // this.count = new DOMElement(this.countTitle.node, {
    //   tagName: 'span',
    //   classList: ['querry-desc__count'],
    //   content: `страниц ${data.pageCount} всего результатов ${data.searchFilmsCountResult}`,
    // });
  }

  private isEmptyKeyword(value: string) {
    return value.length > 0 ? `Вы искали: ${value}` : 'К сожалению, по вашему запросу ничего не найдено...';
  }
}
