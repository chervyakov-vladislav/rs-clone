import { DOMElement } from '../../components/base-elements/dom-element';
import { Page } from '../../components/page';
import { RouterOptions } from '../../models/router-options';
import { routes as mainRoutes } from './routes';

export class Router extends DOMElement {
  private routes: RouterOptions[];

  private container: HTMLElement;

  private template: Page;

  private nestedRoute: string;

  constructor(routes: RouterOptions[]) {
    super(null, {
      tagName: 'div',
      classList: ['router-container'],
    });
    this.routes = routes;
    this.container = this.node;
    this.template = this.findTemplate('');
    this.nestedRoute = this.isGithub();
    this.navigate('');
  }

  public navigate(route: string) {
    this.container.innerHTML = '';
    this.template = route.length > 0 ? this.findTemplate(route) : this.findTemplate('');

    const url = this.nestedRoute + `${route}`;
    history.pushState({}, '', url);

    this.container.append(this.template.node);
  }

  private findTemplateName(path: string) {
    return path.split('/')[0];
  }

  private findTemplate(route: string): Page {
    const templateName = this.findTemplateName(route);
    return (this.routes.find((item) => item.path === templateName) as RouterOptions).template;
  }

  private isGithub() {
    return window.location.hostname.includes('github') ? '/RS-Clone/' : '/';
  }
}

const mainRouter = new Router(mainRoutes);
export default mainRouter;
