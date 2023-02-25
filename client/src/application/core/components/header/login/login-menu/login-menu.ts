import './login-menu.scss';
import DOMElement from '../../../../../shared/components/base-elements/dom-element';
import LinkElement from '../../../../../shared/components/base-elements/link-element';
import ButtonElement from '../../../../../shared/components/base-elements/button-element';
import headerObserver from '../../../../services/menu/header-observer.service';
import storage from '../../../../../shared/components/local-storage';
import state from '../../../../../shared/services/state';
import loginObserver from '../../../../services/menu/login-observer.service';

export default class LoginMenu extends DOMElement {
  private isHidden: boolean;

  private accountItem: DOMElement;

  private accountLink: LinkElement;

  private exitItem: DOMElement;

  private exitButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['login-menu'],
    });
    this.isHidden = true;
    headerObserver.register(this);

    this.accountItem = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['login-menu__item'],
    });

    this.accountLink = new LinkElement(this.accountItem.node, {
      tagName: 'a',
      classList: ['login-menu__link'],
      content: 'Личный кабинет',
      href: '#account',
    });

    this.exitItem = new DOMElement(this.node, {
      tagName: 'li',
      classList: ['login-menu__item'],
    });

    this.exitButton = new ButtonElement(this.exitItem.node, {
      tagName: 'button',
      classList: ['login-menu__link'],
      content: 'Выйти',
    });

    this.exitButton.node.addEventListener('click', () => {
      storage.setToken('');
      window.location.hash = window.location.hash === '#account' ? '#' : window.location.hash;
      state.allData.account.userData.logged = false;
      state.allData.account.userData.userLogin = '';
      state.allData.account.userData.userName = '';
      state.allData.account.userData.userToken = '';
      state.allData.account.userList = [];
      state.allData.account.userData.userRole = 'guest';
      state.resetLikedFimls();
      loginObserver.setButtonText();
      this.node.remove();
      const currentPage = state.getPreviousPageInfo().currentPageID;
      if (currentPage === 'movie') {
        loginObserver.removeMoviePageElems();
        const watchBtn = document.querySelector('.movie-info__to-watch-btn');
        const likebtn = document.querySelector('.movie-info__to-rate-btn');
        watchBtn?.classList.remove('movie-info__to-watch-btn--active');
        likebtn?.classList.remove('movie-info__to-rate-btn--active');
      }
      if (currentPage === 'recomend' || currentPage === 'best' || currentPage === 'searchPage' || currentPage === 's') {
        const watchBtnBest = document.querySelectorAll('.movie-card-flat__to-watch-btn');
        const likeBtnBest = document.querySelectorAll('.movie-card-flat__to-rate-btn');
        const watchBtnSearch = document.querySelectorAll('.search-card__account-button-later');
        const likeBtnBestSearch = document.querySelectorAll('.search-card__account-button-like');

        watchBtnBest.forEach((item) => item.classList.remove('movie-card-flat__to-watch-btn--active'));
        likeBtnBest.forEach((item) => item.classList.remove('movie-card-flat__to-rate-btn--active'));
        watchBtnSearch.forEach((item) => item.classList.remove('search-card__account-button-later--active'));
        likeBtnBestSearch.forEach((item) => item.classList.remove('search-card__account-button-like--active'));
      }
    });
  }
}
