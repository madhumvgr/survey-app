import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/modules/shared/components/confirm-modal/confirm-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  constructor(private modalService: NgbModal) { }

  public async confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmModalComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return await modalRef.result;
  }

}
