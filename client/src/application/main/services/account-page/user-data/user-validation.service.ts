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
    const message = this.message as HTMLElement;

    state.setUserData({
      userName: nameInput.value,
    });
    message.innerText = 'Данные изменены';
    setTimeout(() => {
      message.innerText = '';
    }, 5_000);
  }
}

const userValidation = new UserValidation();
export default userValidation;
