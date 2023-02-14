class AuthValidation {
  private nameLoginTextContainer: HTMLElement | null = null;

  private passwordLoginTextContainer: HTMLElement | null = null;

  private nameRegTextContainer: HTMLElement | null = null;

  private passwordRegTextContainer: HTMLElement | null = null;

  public registerLoginNameMessage(elem: HTMLElement) {
    this.nameLoginTextContainer = elem;
  }

  public registerLoginPassMessage(elem: HTMLElement) {
    this.passwordLoginTextContainer = elem;
  }

  public registerRegNameMessage(elem: HTMLElement) {
    this.nameRegTextContainer = elem;
  }

  public registerRegPassMessage(elem: HTMLElement) {
    this.passwordRegTextContainer = elem;
  }

  // пример валидации - передаем значение инпута
  public validSomething(value: string) {
    console.log(value);
    // как-то обрабатываем
    // берем нужный инпут и добавляем в него текст
    (this.nameLoginTextContainer as HTMLElement).innerText = '';
  }

  public clearAll() {
    const nameLoginMessage = this.nameLoginTextContainer as HTMLElement;
    const passLoginMessage = this.passwordLoginTextContainer as HTMLElement;
    const nameRegMessage = this.nameRegTextContainer as HTMLElement;
    const passRegMessage = this.passwordRegTextContainer as HTMLElement;
    nameLoginMessage.innerHTML = '';
    passLoginMessage.innerHTML = '';
    nameRegMessage.innerHTML = '';
    passRegMessage.innerHTML = '';
  }
}

const authValidation = new AuthValidation();
export default authValidation;
