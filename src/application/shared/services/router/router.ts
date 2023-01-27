import { ButtonElement } from '../../components/base-elements/button-element';
import { RouterOptions } from '../../models/router-options';

export class Router {
  private routes: RouterOptions[];

  private container: HTMLElement;

  private nestedRoute: string;

  constructor(routes: RouterOptions[], container: HTMLElement, listeners: ButtonElement[]) {
    this.routes = routes;
    this.container = container;
    this.nestedRoute = this.isGithub();
    this.addListeners(listeners);
    this.loadInitialRoute();
  }

  public loadRoute(...urlSegments: string[]) {
    const matchedRoute = this.matchUrlToRoute(urlSegments);

    const url = this.nestedRoute + `${urlSegments.join('/')}`;
    history.pushState({}, '', url);

    this.container.innerHTML = '';
    this.container.append(matchedRoute ? (matchedRoute as RouterOptions).template.node : this.routes[0].template.node);
  }

  private matchUrlToRoute(urlSegments: string[]) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegments = route.path.split('/').slice(1);

      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
    });
    return matchedRoute;
  }

  private loadInitialRoute() {
    const pathnameSplit = this.nestedRoute.length > 1 ? this.getPathnameSplit() : window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    this.loadRoute(...pathSegments);
  }

  private addListeners(listeners: ButtonElement[]) {
    listeners.forEach((item, index) =>
      item.node.addEventListener('click', () => this.loadRoute(this.routes[index].path.slice(1)))
    );
  }

  private getPathnameSplit() {
    return window.location.pathname.replace('/chervyakov-vladislav-JSFE2022Q3/async-race/', '/');
  }

  private isGithub() {
    return window.location.hostname.includes('github') ? '/chervyakov-vladislav-JSFE2022Q3/async-race/' : '/';
  }
}
