import './user-data.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../shared/components/base-elements/form-element';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import InputElement from '../../../../shared/components/base-elements/input-element';
import state from '../../../../shared/services/state';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import userValidation from '../../../services/account-page/user-data/user-validation.service';
import LikedFilms from './liked-films/liked-films';
import ReviewsFilms from './reviews/reviews';
import loginObserver from '../../../../core/services/menu/login-observer.service';
import WatchLater from './watch-later/watch-later';
import apiService from '../../../../shared/services/api/server-api.service';
import { User } from '../../../../shared/models/state';

export default class UserData extends DOMElement {
  private title: DOMElement;

  private userInfo: DOMElement;

  private imageContainer: DOMElement;

  private userPicWrapper: DOMElement;

  private userPhoto: ImageElement;

  private uploadButton: DOMElement;

  private loadImage: InputElement;

  private userForm: FormElement;

  private loginInfo: DOMElement;

  private userNameInput: InputElement;

  private userPassInput: InputElement;

  private userSubmit: ButtonElement;

  private userValidationMassage: DOMElement;

  private later: WatchLater | null;

  private liked: LikedFilms | null = null;

  private reviews: ReviewsFilms | null = null;

  private clearLocalStorage: ButtonElement;

  private avatar: File | string;

  private data: User;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['user-data'],
    });
    this.data = state.getUserData();
    this.avatar = this.data.userPhoto;
    this.title = new DOMElement(this.node, {
      tagName: 'h1',
      classList: ['user-data__title'],
      content: 'Личный кабинет',
    });

    this.userInfo = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['user-data__info'],
    });

    this.imageContainer = new DOMElement(this.userInfo.node, {
      tagName: 'div',
      classList: ['user-data__image-container'],
    });

    this.userPicWrapper = new DOMElement(this.imageContainer.node, {
      tagName: 'div',
      classList: ['user-data__image-wrapper'],
    });

    this.userPhoto = new ImageElement(this.userPicWrapper.node, {
      tagName: 'img',
      classList: ['user-data__image'],
      src: `${this.data.userPhoto}`,
    });

    this.uploadButton = new DOMElement(this.imageContainer.node, {
      tagName: 'label',
      classList: ['user-data__image-label'],
      content: 'Загрузить фото',
    });

    this.loadImage = new InputElement(this.uploadButton.node, {
      tagName: 'input',
      type: 'file',
      classList: ['user-data__image-upload'],
      accept: '.jpg, .jpeg, .png',
    });

    this.loadImage.node.addEventListener('change', (e: Event) => {
      [this.avatar] = Array.from((e.target as HTMLInputElement).files as FileList);
      const reader = new FileReader();
      reader.addEventListener('load', async (event: Event) => {
        const { result } = event.target as FileReader;
        state.setUserData({ userPhoto: result as string });
        (this.userPhoto.node as HTMLImageElement).src = `${result}`;
      });
      if (this.avatar.size < 5242880) {
        reader.readAsDataURL(this.avatar);
        this.userValidationMassage.node.innerHTML = '';
      } else {
        this.userValidationMassage.node.innerHTML = 'Файл должен быть меньше 5мб';
      }
    });

    this.userForm = new FormElement(this.userInfo.node, {
      tagName: 'form',
      classList: ['user-data__name-password'],
      action: '#account',
    });
    this.userForm.node.addEventListener('submit', (e) => {
      userValidation.submit(e);
      this.updateUser();
    });

    this.loginInfo = new DOMElement(this.userForm.node, {
      tagName: 'div',
      classList: ['user-data__ligin-info'],
      content: `Ваш логин для входа в аккаунт: ${this.data.userLogin}`,
    });

    this.userNameInput = new InputElement(this.userForm.node, {
      tagName: 'input',
      classList: ['user-data__text-input'],
      placeholder: 'Имя пользователя',
      value: this.data.userName,
    });

    this.userPassInput = new InputElement(this.userForm.node, {
      tagName: 'input',
      classList: ['user-data__text-input'],
      placeholder: 'Пароль',
      type: 'password',
    });

    this.userValidationMassage = new DOMElement(this.userForm.node, {
      tagName: 'span',
      classList: ['user-data__user-validation'],
    });

    this.userSubmit = new ButtonElement(this.userForm.node, {
      tagName: 'button',
      classList: ['user-data__submit'],
      type: 'submit',
      content: 'Сохранить изменения',
    });

    userValidation.registerElems({
      form: this.userForm.node as HTMLFormElement,
      nameInput: this.userNameInput.node as HTMLInputElement,
      passInput: this.userPassInput.node as HTMLInputElement,
      message: this.userValidationMassage.node,
    });

    this.clearLocalStorage = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['user-data__clearLocalStorage'],
      content: 'Очистить список "Вы интересовались"',
    });
    this.clearLocalStorage.node.addEventListener('click', () => {
      localStorage.removeItem('visitedMovies');
      this.clearLocalStorage.node.innerText = 'Очищено';
      setTimeout(() => {
        this.clearLocalStorage.node.innerText = 'Очистить список "Вы интересовались"';
      }, 6_000);
    });

    const watchLaterFilms = state.getWatchLaterList();
    this.later = watchLaterFilms.length > 0 ? new WatchLater(this.node) : null;

    const likedFilms = state.getLikedFilmsList();
    // из-за ограничения по количесву запрсов, нужно ставить таймаут. Другого решения не вижу
    setTimeout(() => {
      this.liked = likedFilms.length > 0 ? new LikedFilms(this.node) : null;
    }, 1_000);

    setTimeout(() => {
      this.reviews = new ReviewsFilms(this.node);
    }, 2_000);
  }

  private updateUser() {
    apiService.updateUser(
      {
        login: this.data.userLogin,
        name: this.userNameInput.inputNode.value,
        password: this.userPassInput.inputNode.value,
        role: '',
      },
      this.avatar instanceof File ? this.avatar : undefined
    );
    loginObserver.setButtonText();
  }
}
