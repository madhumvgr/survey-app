import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input()
  public modalConfig!: ModalConfig;
  @Output() 
  public cancelEvent= new EventEmitter();
  @Input()
  public logOut: ModalConfig["logOut"];

  @Input()
  public IsFromLogin: ModalConfig["logOut"];

  @Input()
  public IsFromVam: ModalConfig["vam"];

  @Output() 
  public exitEvent= new EventEmitter();
    
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent> | undefined
  private modalRef!: NgbModalRef

  constructor(private modalService: NgbModal, private translate: TranslateService) { }

  ngOnInit(): void { }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async exit(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.exitEvent.emit(this.modalConfig.isBackAction);
      this.modalRef.close(result)
    }
  }

  async cancel(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.cancelEvent.emit(this.modalConfig.isBackAction);
      this.modalRef.dismiss(result)
    }
  }
}
export interface ModalConfig {
  isBackAction?:boolean
  modalTitle?: string
  dismissButtonLabel?: string
  closeButtonLabel?: string
  content?:string
  shouldClose?(): Promise<boolean> | boolean
  shouldDismiss?(): Promise<boolean> | boolean
  onClose?(): Promise<boolean> | boolean
  onDismiss?(): Promise<boolean> | boolean
  disableCloseButton?(): boolean
  disableDismissButton?(): boolean
  hideCloseButton?(): boolean
  hideDismissButton?(): boolean
  logOut?: boolean;
  vam?: boolean;
}