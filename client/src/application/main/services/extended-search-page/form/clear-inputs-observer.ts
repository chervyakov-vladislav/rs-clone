class FormInputsObserver {
  private form: HTMLFormElement | null = null;

  public register(observer: HTMLFormElement) {
    this.form = observer;
  }

  public clear() {
    (this.form as HTMLFormElement).reset();
  }
}

const formInputsObserver = new FormInputsObserver();
export default formInputsObserver;
