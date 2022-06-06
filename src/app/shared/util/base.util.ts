import { Observable } from "rxjs";
import { ModalComponent } from "src/app/modules/shared/components/modal/modal.component";
import { ConfirmationDialogService } from "src/app/modules/survey/components/select-genres/confirm-dialog.service";

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

     // @HostListener allows us to also guard against browser refresh, close, etc.
  canDeactivate(confirmationDialogService: ConfirmationDialogService, isNotAutoSave: boolean): boolean | Observable<boolean> | Promise<boolean> {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if(isNotAutoSave){
      var isYes = true;
       confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => isYes= !confirmed)
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      return confirmationDialogService.navigateAwaySelection$;

    }
    return true;
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