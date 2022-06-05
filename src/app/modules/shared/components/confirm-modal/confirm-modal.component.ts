import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from 'src/app/modules/survey/components/select-genres/confirm-dialog.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string ="";
  @Input() message: string = "";
  @Input() btnOkText: string = "";
  @Input() btnCancelText: string = "";

  constructor(private activeModal: NgbActiveModal,private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
  }

  public decline() {
    this.confirmationDialogService.navigateAwaySelection$.next(false);
    this.activeModal.close(false);
  }

  public accept() {
    this.confirmationDialogService.navigateAwaySelection$.next(true);
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
