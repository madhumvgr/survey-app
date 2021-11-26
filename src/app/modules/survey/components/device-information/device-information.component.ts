import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    }else {
      this.deviceStatus = this.deviceState;
    }
    if(this.deviceState == "Completed") {
      this.resubmit = true;
    }
    this.deviceInfoForm = this.fb.group({
      //set to empty. 
      numberOfUsers: [''],
      oftenUsed: [''],
      planToUseDuration: [''],
      deviceNickName: [''],
      deviceId: [''],
      homeNo: ['']
    }
    );
    //get device information. 
    this.deviceService.getDeviceInfo(this.deviceId).subscribe(res => {
      this.deviceInfoFormControl.numberOfUsers.setValue('' + res.numberOfUsers);
      this.deviceInfoFormControl.oftenUsed.setValue('' + res.oftenUsed);
      this.deviceInfoFormControl.planToUseDuration.setValue('' + res.planToUseDuration);
      this.deviceInfoFormControl.deviceNickName.setValue('' + res.deviceNickName);
      // get device device internal details. 
      this.deviceService.getDeviceInnerInfo(this.deviceId).subscribe(res1 => {
        this.deviceInformation.devicePlatform = res1['devicePlatform'];
        this.deviceInformation.os = res1['os'];
        this.deviceInformation.macAddress = res1['macAddress'];
      });
    });
  }

  get deviceInfoFormControl() {
    return this.deviceInfoForm.controls;
  }

  continueNavigate() {
    this.router.navigateByUrl('survey/deviceOwnerInformation/' + this.deviceState + '/' + this.deviceId);
  }

  setNotInuse() {
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

exitEvent(isBackAction:boolean) {
 const message ="You have successfully submitted " +this.deviceName+ " device information to us";
  this.updateForm();
  this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: {message: message}});
}

  updateForm() {
    // send API to submit device information. 
    this.deviceInfoForm.patchValue({
      deviceId: this.deviceId
    })
    this.deviceService.create(this.deviceInfoForm.value).subscribe(res =>
      console.log(res));
  }
  resubmitForm() {
    const message ="Thank you for updating your info page! ";
  this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: {message: message}});
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