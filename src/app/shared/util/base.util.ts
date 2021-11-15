import { ModalComponent } from "src/app/modules/shared/components/modal/modal.component";

export class BaseComponent {
    private modalComponent1!: ModalComponent;
    modalConfig = {
        "modalTitle": "Save and Exit",
        "content": "Your work is saved! You can always finish the rest of it later.",
        "dismissButtonLabel": "Cancel",
        "closeButtonLabel": "Exit",
    }

    constructor() {
    }

    async openModal() {
        return await this.modalComponent1.open()
    }

    afterViewInit(modalComponent: ModalComponent) {
        this.modalComponent1 = modalComponent;
    }
    cancelEvent(){
    
    }
    exitEvent(){
     
    }
}