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

  private userOldPassInput: InputElement;

  private userSubmit: ButtonElement;

  private userValidationMassage: DOMElement;

  private later: WatchLater | null;

  private liked: LikedFilms | null = null;

  private reviews: ReviewsFilms | null = null;

  private clearLocalStorage: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['user-data'],
    });
    const data = state.getUserData();

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
      src: `${data.userPhoto}`,
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
      const file = Array.from((e.target as HTMLInputElement).files as FileList)[0];
      const reader = new FileReader();
      reader.addEventListener('load', async (event: Event) => {
        const { result } = event.target as FileReader;
        state.setUserData({ userPhoto: result as string });
        loginObserver.setButtonText();
        (this.userPhoto.node as HTMLImageElement).src = `${result}`;
      });
      if (file.size < 5242880) {
        reader.readAsDataURL(file);
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
    this.userForm.node.addEventListener('submit', userValidation.submit.bind(userValidation));

    this.loginInfo = new DOMElement(this.userForm.node, {
      tagName: 'div',
      classList: ['user-data__ligin-info'],
      content: `Ваш логин для входа в аккаунт: ${data.userName}`,
    });

    this.userNameInput = new InputElement(this.userForm.node, {
      tagName: 'input',
      classList: ['user-data__text-input'],
      placeholder: 'Имя пользователя',
      value: data.userName,
    });

    this.userOldPassInput = new InputElement(this.userForm.node, {
      tagName: 'input',
      classList: ['user-data__text-input'],
      placeholder: 'Старый пароль',
      type: 'password',
    });

    this.userPassInput = new InputElement(this.userForm.node, {
      tagName: 'input',
      classList: ['user-data__text-input'],
      placeholder: 'Новый пароль',
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
      content: 'Изменить',
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
}
