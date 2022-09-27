import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { ComponentCanDeactivate } from 'src/app/shared/services/pending-changes.guard';
import { BaseComponent } from 'src/app/shared/util/base.util';
import { ConfirmationDialogService } from '../select-genres/confirm-dialog.service';

@Component({
  selector: 'app-device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.css']
})

export class DeviceInformationComponent extends BaseComponent implements OnInit, ComponentCanDeactivate {
  deviceId: any;
  deviceState: any;
  deviceInfoForm: FormGroup = this.fb.group({});
  deviceInformation: DeviceInfo = new DeviceInfo();
  resubmit: boolean = false;
  deviceStatus: any;
  isDeviceNoLonger: any;
  error: boolean = false;
  nickName: any;
  upateNickName: boolean = false;

  deviceName: any;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  isNotAutoSave$: Observable<any> = new Observable();
  isNotAutoSave = false;
  submitCall = false;

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.deviceInfoForm.dirty && !this.submitCall) {
      return super.canDeactivate(this.confirmationDialogService, this.isNotAutoSave);
    } else {
      return true;
    }
  }

  openConfirmDialog(){
    const warningTittle ="completedDevices.warning-tittle";
    let message: any;
    if(this.deviceInfoForm.value.numberOfUsers == 0 || this.deviceInfoForm.value.numberOfUsers == 1){
      message = "completedDevices.warning-msg1"
    } else if(this.deviceInfoForm.value.numberOfUsers == 4) {
      message = "All members that did submit their informations will be lost and  this device in the Not in use section."
    }
if(this.deviceInfoFormControl.numberOfUsers.dirty) {
  this.confirmationDialogService.confirm(warningTittle, message, 'completedDevices.warning-btn2', 'completedDevices.warning-btn1')
  .then((confirmed) => {
    if(confirmed){
      if(this.deviceInfoForm.value.numberOfUsers == 4) {
        this.setNotInuse();
     //   const message = this.translate.instant('deviceInformation.success') +this.deviceName+ this.translate.instant('deviceInformation.success');
        this.router.navigate(['survey/Thankyou/deviceList/' +this.deviceState], { state: { message: message, inputRoute:"deviceList" } });
      } else {
      const message = "Thank you , please note that this device is now Available for you to complete on the 'IN PROGRESS DEVICE SECTION' to complete.";
      // call reset api.
      this.deviceInfoForm.patchValue({
        deviceId: this.deviceId
      })
      this.deviceService.create(this.deviceInfoForm.value).subscribe(res => {
        if(this.nickName) {
          this.deviceName = this.nickName;
          this.localStorageService.setDeviceName(this.nickName);
        }
        this.deviceService.resetDevice(this.deviceId).subscribe(response => {
          console.log(response);
          this.router.navigate(['survey/device/Thankyou/'+this.deviceState+ '/' +this.deviceId], { state: { message: message, inputRoute: "Complete_Inprogress" } });
        });
    })
    }
    }
  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));


} else  {
  const message = "You want to update the device name"
  this.confirmationDialogService.confirm('completedDevices.warning-tittle', message, 'completedDevices.warning-btn2', 'completedDevices.warning-btn1')
  .then((confirmed) => {
    if(confirmed){
        this.deviceService.create(this.deviceInfoForm.value).subscribe(res => {
          if(this.nickName) {
            this.deviceName = this.nickName;
            this.localStorageService.setDeviceName(this.nickName);
            const message = this.translate.instant('deviceInformation.resubmit');
           this.router.navigate(['survey/Thankyou/deviceList/' +this.deviceState], { state: { message: message, inputRoute:"deviceList" } });

          }
        })
      } 
    }
  )
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  }

  constructor(private fb: FormBuilder, private Activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
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
    if (this.deviceState == "Inprogress") {
      this.deviceStatus = "In Progress"
    } else if (this.deviceState == "Notused") {
      this.deviceStatus = "Not in Use"
    } else {
      if (this.deviceState == "Completed") {
        this.isNotAutoSave$ = this.route.queryParamMap.pipe(
          map((params: ParamMap) => params.get('isNotAutoSave')),
        );
        this.isNotAutoSave$.subscribe(param => {
          this.isNotAutoSave = param;
          console.log(this.isNotAutoSave);
        });
      }
      this.deviceStatus = this.deviceState;
    }
    if (this.deviceState == "Completed") {
      this.resubmit = true;
    }
    this.deviceInfoForm = this.fb.group({
      //set to empty. 
      numberOfUsers: ['', Validators.required],
      oftenUsed: ['', Validators.required],
      planToUseDuration: ['', Validators.required],
      deviceNickName: [''],
      deviceId: [''],
      homeNo: ['']
    }
    );
    //get device information. 
    this.deviceService.getDeviceInfo(this.deviceId).subscribe(res => {
      this.deviceInfoFormControl.numberOfUsers.setValue('' + (res.numberOfUsers));
      this.deviceInfoFormControl.oftenUsed.setValue('' + (res.oftenUsed));
      this.deviceInfoFormControl.planToUseDuration.setValue('' + (res.planToUseDuration));
      this.deviceInfoFormControl.deviceNickName.setValue('' + res.deviceNickName ? res.deviceNickName : '');

      if (res.numberOfUsers === 4) {
        this.isDeviceNoLonger = true;
      } else {
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
    if (this.deviceInfoForm.controls.numberOfUsers.value == "null") {
      this.error = true;

    }else{
      this.error = false;
      this.localStorageService.setDeviceName(this.deviceName);
      this.deviceState = 'Inprogress'
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
    this.upateNickName = true;
    this.nickName = e.target.value;
    this.updateForm();
  }

  exitEvent(isBackAction: boolean) {
    let message: any;
    if (this.deviceState == "Completed") {
      message = this.translate.instant('deviceInformation.success2');
    } else {
      message = this.translate.instant('deviceInformation.success');
    }
    this.updateForm();
    this.router.navigate(['survey/Thankyou/deviceList/' + this.deviceState], { state: { message: message, inputRoute: "deviceList" } });

  }

  updateForm() {
    this.isDeviceNoLonger = false;
    this.error = false;
    // send API to submit device information. 
    this.deviceInfoForm.patchValue({
      deviceId: this.deviceId
    })
    if (!this.isNotAutoSave) {
      this.deviceService.create(this.deviceInfoForm.value).subscribe(res => {
        if(this.nickName) {
          this.deviceName = this.nickName;
          this.localStorageService.setDeviceName(this.nickName);
        }
    })
  }
  }
  
  resubmitForm() {
    this.submitCall = true;
    if(this.isNotAutoSave && this.deviceInfoForm.dirty)  {
      this.openConfirmDialog();
    }  else {
       const message = 'deviceInformation.resubmit';
       this.router.navigate(['survey/device/Thankyou/'+this.deviceState+ '/' +this.deviceId], { state: { message: message, inputRoute: "Completed" } });

    //  });
  

    }
   

  }

  showWindow() {
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'), 'name', 'width=600,height=400,top=200');
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