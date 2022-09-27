import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { NotificationService } from 'src/app/modules/notification/service/notification.service';
import { ModalComponent } from 'src/app/modules/shared/components/modal/modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { BaseComponent } from 'src/app/shared/util/base.util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends BaseComponent implements OnInit {
  homeNo: any;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  memberNo: any;
  lang: any;
  constructor(private authService: AuthService,
    private zone: NgZone,
    private notifService: NotificationService,
    private sharedService: SharedService,
    private router: Router,
    private deviceService: DeviceService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute) {
    super();
    this.homeNo = this.route.snapshot.params['homeNo'];

  }

  ownerResetDone = false;
  OwnerNoReset = true;

  resetDone = false;
  noReset = true;

  auditData: any;
  adminName: any;
  lastModified: any;

  ngOnInit(): void {
    this.lang = this.localStorageService.getItem(StorageItem.LANG)
  }

  ngAfterViewInit() {
    super.afterViewInit(this.modalComponent);
  }

  exitEvent(isBackAction: boolean) {
    this.takeControl();
  }

  takeControl() {
    this.deviceService.adminControl(this.homeNo).subscribe((response: { [x: string]: string; id_token: any; id: any; }) => {
      if (response) {
        console.log(response.id_token);
        console.log(response.id);
        this.localStorageService.setIdToken(response['id_token']);
        this.localStorageService.setTakeControl(true);
        this.router.navigate(['/welcome']);
        this.authService.SetQuestionValid(true)
      }
    })
  }

  resetIndSurvey() {

    this.deviceService.resetInd(this.homeNo, this.memberNo).subscribe((response: any) => {
      if(response){
        this.noReset = false;
        this.resetDone = true;
      }
    })
    this.auditIndividual();
  }

  resetOwner() {
    this.deviceService.resetOwner(this.homeNo).subscribe((response: any) => {
      if (response) {
        this.OwnerNoReset = false;
        this.ownerResetDone = true;
      }
    })
    this.auditOwner();
  }

  auditOwner() {
    this.deviceService.getAuditData(this.homeNo).subscribe((response: any) => {
      if (response) {
        console.log(response);
        this.auditData = response;
        this.auditData.forEach((data: any) => {
          console.log(data);
          if(data.eventType == "resetHousehold"){
            this.adminName = data.adminName;
            this.lastModified = data.lastModified;
          }
        })
      }
    })
  }

  auditIndividual() {
    this.deviceService.getAuditData(this.homeNo).subscribe((response: any) => {
      if (response) {
        console.log(response);
        this.auditData = response;
        this.auditData.forEach((data: any) => {
          console.log(data);
          if(data.eventType == "resetIndividual"){
            this.adminName = data.adminName;
            this.lastModified = data.lastModified;
          }
        })
      }
    })
  }

}
