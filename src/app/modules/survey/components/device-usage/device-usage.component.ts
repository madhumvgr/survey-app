import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { BaseComponent } from 'src/app/shared/util/base.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-device-usage',
  templateUrl: './device-usage.component.html',
  styleUrls: ['./device-usage.component.css']
})
export class DeviceUsageComponent extends BaseComponent implements OnInit {

  deviceId : any;
  deviceState: any;
  memberList: any;
  ownerName: any;
  deviceName: any;
  button = 'Edit';
  totalMembers: any;
  isCompleted= false;
  resubmit: boolean = false;
  deviceStatus: any;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  constructor(private Activatedroute:ActivatedRoute, private localStorageService:LocalStorageService, private router: Router,private deviceService: DeviceService, private translate: TranslateService) { 
    super();
  }
  ngAfterViewInit(){
    super.afterViewInit(this.modalComponent);
  }

  ngOnInit(): void {
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    if(this.deviceState =="Inprogress") {
      this.deviceStatus = "In Progress"
    }else {
      this.deviceStatus = this.deviceState;
    }
    this.ownerName = this.Activatedroute.snapshot.params['memeberName'];
    if(this.deviceState == "Completed") {
      this.resubmit = true;
    }
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        this.memberList = response;
        this.totalMembers = this.memberList.length;
        let count=0;
         this.memberList.forEach( (element1:any) => {
           if(element1.memberSurveyStatusId == 1){
              count++;
           }
         });
         if( count== this.memberList.length){
          this.isCompleted = true;
         }
      }
    });
  }
  continueNavigate(memberNo:any,memberName:any){ 
    this.router.navigate(['survey/deviceGeneres/'+this.deviceState+'/'+memberNo+'/'+this.deviceId], { state: { memberName: memberName } });
  }

  submit() {
    let message: any;  
    if(this.deviceState == "Completed") { 
     message = this.translate.instant('deviceInformation.success') +this.deviceName+ this.translate.instant('deviceInformation.success2');
    } else {
      message = this.translate.instant('deviceInformation.success') + this.deviceName+ this.translate.instant('deviceInformation.success2');
    }
    this.deviceService.updateHomeSurvey(this.deviceId).subscribe(
      res => {console.log(res);
        this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: {message: message}});
      });
  }

  resubmitForm() {
    const message = 'deviceInformation.resubmit';
    this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: {message: message}});
  }

  backButton() {
    if(this.totalMembers == 1) {
      this.router.navigateByUrl('/survey/deviceOwnerInformation/' + this.deviceState + '/' + this.deviceId);
    } else  {
      this.router.navigateByUrl('/survey/multiUserList/' + this.deviceState + '/' + this.deviceId);
    }
  }

  exitEvent(isBackAction:boolean) {
    const message = this.translate.instant('deviceInformation.success'); +this.deviceName+ this.translate.instant('deviceInformation.success2');;
     this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: {message: message}});
   }

}
