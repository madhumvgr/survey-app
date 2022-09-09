import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { BaseComponent } from 'src/app/shared/util/base.util';
import { TranslateService } from '@ngx-translate/core';
export interface Owner {
  memberName: string;
  memberNo: string;
  homeNo: string;
  deviceId: string;
  memberSurveyStatus: string;
  memberSurveyStatusId: string;
  usePercentage: string;

}
@Component({
  selector: 'app-device-owner-information',
  templateUrl: './device-owner-information.component.html',
  styleUrls: ['./device-owner-information.component.css']
})
export class DeviceOwnerInformationComponent extends BaseComponent implements OnInit {
  deviceId: any;
  deviceName:any;
  deviceState: any;
  ownerList: Owner[] = [];
  ownerSelect: any = "";
  error: boolean = false;
  selectedOwner: any = {};
  notUsed: boolean = false;
  singleMemeber: boolean = false;
  resubmit: boolean = false;
  singleUserFlow: boolean = false;
  sspUserFlow: boolean = false;
  panelListType: any;
  deviceStatus: any;
  memeberNo:any;
  memberName:any;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  deviceOwnerInfoForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, private Activatedroute: ActivatedRoute,
    private router: Router, private deviceService: DeviceService, private localStorageService:LocalStorageService,
    private translate: TranslateService) {
      super();
      this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
     }

     ngAfterViewInit(){
      super.afterViewInit(this.modalComponent);
    }

  ngOnInit(): void {
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
    this.panelListType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
     this.deviceOwnerInfoForm = this.fb.group({
      selectedOwner: [''],
    });
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    if(this.deviceState =="Inprogress") {
      this.deviceStatus = "In Progress"
    }else {
      this.deviceStatus = this.deviceState;
    }
    if(this.deviceState == "Completed") {
      this.resubmit = true;
    }
    this.deviceService.getDeviceInfo(this.deviceId).subscribe(res => { 
      const deviceCheck = res.numberOfUsers;
      if(deviceCheck == null ) {
        this.notUsed = true;
      } else if(deviceCheck == 0) {
        if(this.panelListType == "SSP") {
          this.sspUserFlow = true;
        } else {
          this.singleUserFlow = true;
        }
      }

    });
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        this.ownerList = response;
        const memberCount: any = this.ownerList.length;
        if(memberCount == 1) {
          this.singleMemeber = true;
          console.log(this.singleMemeber)
        }

        // get owner information of a particular device. 
        this.deviceService.getCustomRequest(DeviceConstants.deviceOwnerByDeviceId + this.deviceId).subscribe(response => {
          if (response) {
              this.selectedOwner = response;
              this.ownerList.forEach(owner => {
              if(owner.memberNo == this.selectedOwner.memberNo){
                this.memberName = owner.memberName;
                this.memeberNo = owner.memberNo;
              }
              })
              this.deviceOwnerInfoForm.get('selectedOwner')?.setValue(this.selectedOwner['memberNo']); 
          }
        });

      }
    });
  }

  // convenience getter for easy access to form fields
  get deviceInfoFormControl() { return this.deviceOwnerInfoForm.controls; }

  continueNavigate() {
    this.localStorageService.setDeviceName(this.deviceName);
    let selectedOwner = this.deviceInfoFormControl["selectedOwner"];
    if (selectedOwner.value == '') {
      this.error = true;
    }
    console.log(selectedOwner.value);
    let selectedOwn: any;
    selectedOwn = this.ownerList.filter(owner => owner.memberNo === selectedOwner.value)[0];
    // post call to save device member information.
    let device = {
      "deviceId": this.deviceId,
      "homeNo": selectedOwn["homeNo"],
      "memberNo": selectedOwn["memberNo"],
      "memberName": selectedOwn["memberName"]
    }

    this.deviceService.updateDeviceMember(device).subscribe(response => {
      console.log(response);
      this.memeberNo =device.memberNo;
      this.memberName = device.memberName;
    });
  }

  nextPage() {
    let selectedOwner = this.deviceInfoFormControl["selectedOwner"];
    if (selectedOwner.value == '') {
      this.error = true;
    }else if(this.notUsed) {
      const message = 'deviceInformation.success';
      const message1 = 'notInUse.not_in_use_msg';
      this.localStorageService.setSubmitDevice(this.deviceName);
      this.router.navigate(['survey/Thankyou/deviceList/' +this.deviceState], { state: { message: message1, inputRoute:"deviceList" } });
     }else if(this.singleMemeber) {
       this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
     } else if(this.singleUserFlow) {
       this.router.navigate(['survey/selectGeneres/'+this.deviceState+'/'+this.memeberNo+'/'+this.deviceId], { state: { memberName: this.memberName } });
     }
     else {
       this.router.navigateByUrl('survey/multiUserList/' + this.deviceState + '/' + this.deviceId);
     }
  }
  surveySubmit() {
    let message = 'deviceInformation.success2';
    this.deviceService.updateHomeSurvey(this.deviceId).subscribe(
      res => {console.log(res);
   //   const message = "'deviceInformation.success' + this.deviceName+'.'";
      console.log(message);
      this.localStorageService.setSubmitDevice(this.deviceName);
        this.router.navigate(['survey/Thankyou/deviceList/' +this.deviceState], { state: { message: message, inputRoute:"submit_device"} });

      });
  }

  exitEvent(isBackAction:boolean) {
    let message: any;
    if( this.deviceState == "Completed") {
       message ='deviceInformation.success';
    } else{
       message ='deviceInformation.success';
    }
    this.router.navigate(['survey/Thankyou/deviceList/' +this.deviceState], { state: { message: message, inputRoute:"deviceList" } });
   }

   resubmitForm() {
    const message = 'deviceInformation.resubmit';
    this.router.navigate(['survey/Thankyou'], {state: {message: message}});
  }

}
