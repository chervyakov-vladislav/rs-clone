import './login.scss';
import { ButtonElement } from '../../../../shared/components/base-elements/button-element';

export class Login extends ButtonElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'button',
      classList: ['login'],
      content: 'Вход',
    });

    // какая-то модалка при авторизации, для выхода и перехода в личный кабинет
  }
}
