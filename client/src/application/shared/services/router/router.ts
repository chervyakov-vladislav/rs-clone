import DOMElement from '../../components/base-elements/dom-element';
// import Page from '../../components/page';
import { RouterOptions } from '../../models/router-options';
import mainRoutes from './routes';

export default class Router extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['router-container'],
    });
<<<<<<< HEAD
    this.enableRouteChange();
    this.renderNewPage('');
=======
    this.routes = routes;
    this.container = this.node;
    this.template = this.findTemplate('');
    this.nestedRoute = this.isGithub();
    this.navigate('');
    // this.hashChangeListener();
    console.log('router work');
>>>>>>> feat/add-trailer-to-main-page
  }

  public renderNewPage(pageID: string) {
    this.node.innerHTML = '';
    const element = this.findNewtemplate(pageID);
    const newPage = element.length !== 0 ? element[0].template().node : mainRoutes[0].template().node;
    // тут написать, если pageID, это страница какого-то одного фильма, то загрузить новый фильм в стейт страницы и только потом её рисовать
    // можно испольвовать конструкцию switch, как в online-store: https://github.com/chervyakov-vladislav/online-store/blob/main/src/application/main/router/router.ts
    this.node.append(newPage);
  }

  private findNewtemplate(pageID: string): RouterOptions[] {
    return mainRoutes.filter((route) => route.id === pageID);
  }

<<<<<<< HEAD
  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1).split('/')[0];
      this.renderNewPage(hash);
    });
  }
=======
  private findTemplate(route: string) {
    const templateName = this.findTemplateName(route);
    const routeToNavigate = this.routes.find((item) => item.path === templateName);

    return routeToNavigate ? routeToNavigate.template() : this.routes[0].template();
  }

  private isGithub() {
    return window.location.hostname.includes('github') ? '/RS-Clone/#/' : '/#/';
  }

  // private hashChangeListener() {
  //   window.addEventListener('hashchange', () => {
  //     const hash = window.location.hash.slice(2);
  //     this.navigate(hash);
  //   });
  // }
>>>>>>> feat/add-trailer-to-main-page
}
