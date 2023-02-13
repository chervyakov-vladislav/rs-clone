import './user-data.scss';
import userPhoto from '../../../../../assets/images/login.png';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import FormElement from '../../../../shared/components/base-elements/form-element';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import InputElement from '../../../../shared/components/base-elements/input-element';

export default class UserData extends DOMElement {
  private title: DOMElement;

  private userInfo: DOMElement;

  private imageContainer: DOMElement;

  private userPicWrapper: DOMElement;

  private userPhoto: ImageElement;

  private uploadButton: DOMElement;

  private loadImage: InputElement;

  private userForm: FormElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['user-data'],
    });

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
      src: userPhoto,
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
      reader.addEventListener('load', (event: Event) => {
        const { result } = event.target as FileReader;
        (this.userPhoto.node as HTMLImageElement).src = `${result}`;
      });
      reader.readAsDataURL(file);
    });

    // грузим данные по пользователю из стейта или из бека, зависит от реализации
    // может грузим не тут, какая будет реализация, еще не известно
    // пока положу тут шаблон
    // const mockUserName = 'Выдуманный Организм';
    // const mockUserPassword = 'chicksayskoko';
    this.userForm = new FormElement(this.userInfo.node, {
      tagName: 'form',
      classList: ['user-data__name-password'],
      content: 'форма с данными',
    });
  }
}
