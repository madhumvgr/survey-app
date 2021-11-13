import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.css']
})

export class DeviceInformationComponent implements OnInit,OnChanges {
  deviceId : any;
  deviceState: any;
  deviceInfoForm: FormGroup = this.fb.group({});
  deviceInformation : DeviceInfo = new DeviceInfo();

  deviceName: any;
  constructor(private fb: FormBuilder,private Activatedroute:ActivatedRoute,private router: Router, 
    private deviceService: DeviceService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceInfoForm = this.fb.group({
      //set to empty. 
      numberOfUsers: ['2'],
      oftenUsed: ['2'],
      planToUseDuration: ['2'],
      deviceNickName: [''],
      deviceId: [''],
      homeNo: ['']
    }
    );
    //get device information. 
    this.deviceService.getDeviceInfo(this.deviceId).subscribe( res => {
      this.deviceInfoFormControl.numberOfUsers.setValue(''+res.numberOfUsers);
      this.deviceInfoFormControl.oftenUsed.setValue(''+res.oftenUsed);
      this.deviceInfoFormControl.planToUseDuration.setValue(''+res.planToUseDuration);
      this.deviceInfoFormControl.deviceNickName.setValue(''+res.deviceNickName);
      // get device device internal details. 
      this.deviceService.getDeviceInnerInfo(this.deviceId).subscribe( res1 => {
       this.deviceInformation.devicePlatform=res1['devicePlatform'];
       this.deviceInformation.os=res1['os'];
       this.deviceInformation.macAddress=res1['macAddress'];
      });
    });
  }

  ngOnChanges(){
    // this.deviceInfoForm.valueChanges.subscribe(val => {
    //   this.updateForm();
    // });
  }

  get deviceInfoFormControl() {
    return this.deviceInfoForm.controls;
  }

  continueNavigate(){
    this.router.navigateByUrl('survey/deviceOwnerInformation/'+this.deviceState+'/'+this.deviceId);
  }

  updateForm(){
    // send API to submit device information. 
    this.deviceInfoForm.patchValue({
      deviceId: this.deviceId
    })
    this.deviceService.create(this.deviceInfoForm.value).subscribe( res => 
      console.log(res));
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