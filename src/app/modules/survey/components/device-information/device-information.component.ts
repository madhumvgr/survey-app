import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { BaseComponent } from 'src/app/shared/util/base.util';

@Component({
  selector: 'app-device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.css']
})

export class DeviceInformationComponent extends BaseComponent implements OnInit {
  deviceId: any;
  deviceState: any;
  deviceInfoForm: FormGroup = this.fb.group({});
  deviceInformation: DeviceInfo = new DeviceInfo();
  resubmit: boolean = false;
  deviceStatus: any;
  isDeviceNoLonger: any;
  error: boolean = false;
  nickName: any;

  deviceName: any;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  constructor(private fb: FormBuilder, private Activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService,
    private localStorageService: LocalStorageService, private translate: TranslateService) {
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
    }else if(this.deviceState =="Notused") {
      this.deviceStatus = "Not in Use"
    } else {
      this.deviceStatus = this.deviceState;
    }
    if(this.deviceState == "Completed") {
      this.resubmit = true;
    }
    this.deviceInfoForm = this.fb.group({
      //set to empty. 
      numberOfUsers: ['',Validators.required],
      oftenUsed: ['',Validators.required],
      planToUseDuration: ['',Validators.required],
      deviceNickName: [''],
      deviceId: [''],
      homeNo: ['']
    }
    );
    //get device information. 
    this.deviceService.getDeviceInfo(this.deviceId).subscribe(res => {
      this.deviceInfoFormControl.numberOfUsers.setValue(''+(res.numberOfUsers));
      this.deviceInfoFormControl.oftenUsed.setValue('' + (res.oftenUsed));
      this.deviceInfoFormControl.planToUseDuration.setValue('' + (res.planToUseDuration));
      this.deviceInfoFormControl.deviceNickName.setValue('' + res.deviceNickName?res.deviceNickName:'');
      
      if(res.numberOfUsers === 4) {
        this.isDeviceNoLonger = true;
      }else {
        this.isDeviceNoLonger = false;
      }
      // get device device internal details. 
      this.deviceService.getDeviceInnerInfo(this.deviceId).subscribe(res1 => {
        this.deviceInformation.devicePlatform = res1['devicePlatform'];
        this.deviceInformation.os = res1['os'];
        this.deviceInformation.macAddress = res1['macAddress'];
      });
    });

    console.log(this.deviceInfoFormControl.oftenUsed);
  }

  get deviceInfoFormControl() {
    return this.deviceInfoForm.controls;
  }

  continueNavigate() {
    if(this.deviceInfoForm.controls.numberOfUsers.value == "null"){
      this.error = true;

    }else{
      this.error = false;
      this.router.navigateByUrl('survey/deviceOwnerInformation/' + this.deviceState + '/' + this.deviceId);
    }
  }

  setNotInuse() {
    this.isDeviceNoLonger = true;
    //set device to not in use. 
    this.deviceInfoForm.patchValue({
      deviceId: this.deviceId
    })
    this.deviceService.create(this.deviceInfoForm.value).subscribe(res => {
      this.deviceService.updateNotInUse(this.deviceId).subscribe(
        res1 => {
          console.log("Updated to not in use");
        }
      );
      console.log(res);
    });
  }

  deviceNameUpdate(e: any) {
    this.nickName = e.target.value;
    this.updateForm();
  }

exitEvent(isBackAction:boolean) {
  let message: any;
  if( this.deviceState == "Completed") {
     message = 'deviceInformation.success';
  } else{
     message ='deviceInformation.success';
  }
  this.updateForm();
  this.router.navigate(['survey/Thankyou/deviceList/' +this.deviceState], { state: { message: message, inputRoute:"deviceList" } });

}

  updateForm() {
    this.isDeviceNoLonger = false;
    this.error = false;
    // send API to submit device information. 
    this.deviceInfoForm.patchValue({
      deviceId: this.deviceId
    })
    this.deviceService.create(this.deviceInfoForm.value).subscribe(res => {
    this.localStorageService.setDeviceName(this.nickName);
    })
  }
  resubmitForm() {
  const message = 'deviceInformation.resubmit';
  this.router.navigate(['survey/Thankyou'], {state: {message: message}});
  }

  showWindow(){
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'),'name','width=600,height=400,top=200');
  }

}
export class DeviceInfo {
  numberOfUsers: string | undefined;
  oftenUsed: string | undefined;
  planToUseDuration: string | undefined;
  deviceNickName: string | undefined;
  deviceId: string | undefined;
  homeNo: string | undefined;
  devicePlatform: string | undefined;
  os: string | undefined;
  macAddress: string | undefined;
  deviceName: string | undefined;
}