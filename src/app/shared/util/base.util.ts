import { ModalComponent } from "src/app/modules/shared/components/modal/modal.component";

export class BaseComponent {
    private modalComponent1!: ModalComponent;
    modalConfig = {
        "isBackAction": false,
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
    cancelEvent(event:boolean) {

    }
    exitEvent(event:boolean) {

    }

    backAction() {
        this.modalConfig = {
            "isBackAction": true,
            "modalTitle": "Device usaga surveys not complete",
            "content": "Device usage surveys for 0 members aren't complete. You may still submit the ones you've completed and come back later for the rest.",
            "dismissButtonLabel": "Cancel",
            "closeButtonLabel": "submit",
        }
        this.openModal();
        //this.router.navigateByUrl('/survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
    }
}