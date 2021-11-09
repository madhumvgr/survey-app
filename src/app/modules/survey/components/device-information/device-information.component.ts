import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';

@Component({
  selector: 'app-device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.css']
})

export class DeviceInformationComponent implements OnInit {
  deviceId : any;
  deviceState: any;
  deviceInfoForm: FormGroup = this.fb.group({});
  deviceInformation : DeviceInfo = new DeviceInfo();
  deviceName: any;
  constructor(private fb: FormBuilder,private Activatedroute:ActivatedRoute,private router: Router, 
    private deviceService: DeviceService) { }

  ngOnInit(): void {
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
     // this.deviceName= res.deviceNickName;
    });
    // this.deviceInformation = {
    //   numberOfUsers: "1",
    //   oftenUsed: "2",
    //   planToUseDuration:"2",
    //   deviceNickName:"NickName",
    //   deviceId: "1000",
    //   homeNo: "",
    // }

    this.deviceName = this.getDeviceName(this.deviceId);
  }

  get deviceInfoFormControl() {
    return this.deviceInfoForm.controls;
  }

  getDeviceName(deviceId: string) {
    switch (deviceId) {
      case "000001":
        return "Smart TV";
      case "000002":
        return "Laptop MAC";
      case "000003":
        return "Samsung Mobile";
      case "000004":
        return "iPhone Satish";
      case "000005":
        return "Playstation 4";    
      case "000006":
        return "desktop_mac";  
      case "000001":
        return "desktop_windows";
      case "000001":
        return "smartphone";
      default:
        return "";
    }
  }

  continueNavigate(){
    this.router.navigateByUrl('survey/deviceOwnerInformation/'+this.deviceState+'/'+this.deviceId);
  }

  saveAndExit(){
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
}