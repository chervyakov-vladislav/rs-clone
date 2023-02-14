import state from '../../../../shared/services/state';

type FormElems = {
  form: HTMLFormElement;
  nameInput: HTMLInputElement;
  passInput: HTMLInputElement;
  message: HTMLElement;
};

class UserValidation {
  private userForm: HTMLFormElement | null = null;

  private userNameInput: HTMLInputElement | null = null;

  private userPassInput: HTMLInputElement | null = null;

  private message: HTMLElement | null = null;

  public registerElems(options: FormElems) {
    this.userForm = options.form;
    this.userNameInput = options.nameInput;
    this.userPassInput = options.passInput;
    this.message = options.message;
  }

  public submit(e: Event) {
    e.preventDefault();
    const nameInput = this.userNameInput as HTMLInputElement;
    const passInput = this.userPassInput as HTMLInputElement;
    const message = this.message as HTMLElement;
    // какая-то проверка значений, если нужна и другие манипуляции

    state.setUserData({
      userName: nameInput.value,
      userPassword: passInput.value,
    });
    message.innerText = 'Данные изменены';
    setTimeout(() => {
      message.innerText = '';
    }, 5_000);
  }
  // какие-то методы для валидации, если нужно
}

const userValidation = new UserValidation();
export default userValidation;
