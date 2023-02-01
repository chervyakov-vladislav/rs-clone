import mainRouter from '../../../shared/services/router/router';
import SideMenu from '../../components/main-container/side-menu/side-menu';

class SideMenuListeners {
  public appendListeners(sideMenu: SideMenu) {
    sideMenu.mainPageItem.node.addEventListener('click', (e) => {
      e.preventDefault();
      mainRouter.navigate('');
    });
    sideMenu.moviesItem.node.addEventListener('click', (e) => {
      e.preventDefault();
      mainRouter.navigate('premiere');
    });
  }
}

const sideMenuListeners = new SideMenuListeners();
export default sideMenuListeners;
