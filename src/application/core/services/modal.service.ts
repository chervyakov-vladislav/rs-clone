import { ModalPage } from '../components/modal/modal';

class ModalService {
  public modal: ModalPage;

  public parantNode: HTMLElement | null = null;

  constructor() {
    this.modal = new ModalPage('modal');
  }

  public appendModal(text: string) {
    this.modal.message.node.innerText = text;
    (this.parantNode as HTMLElement).append(this.modal.node);
  }

  public removeModal() {
    this.modal.node.remove();
  }
}

const modalService = new ModalService();
export { modalService };
