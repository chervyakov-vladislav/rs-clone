import mainRouter from '../../../shared/services/router/router';

class HeaderNavigationListeners {
  public appendLogoListener(logo: HTMLElement) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      mainRouter.navigate('');
    });
  }
}

const headerNav = new HeaderNavigationListeners();
export default headerNav;
