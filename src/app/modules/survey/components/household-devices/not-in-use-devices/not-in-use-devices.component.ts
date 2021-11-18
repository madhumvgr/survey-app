import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { DeviceInfo } from '../../device-information/device-information.component';

@Component({
  selector: 'app-not-in-use-devices',
  templateUrl: './not-in-use-devices.component.html',
  styleUrls: ['./not-in-use-devices.component.css']
})
export class NotInUseDevicesComponent implements OnInit {
  deviceName:any;
  question1:any="false";
  deviceId: any;
  deviceState: any;
  deviceInformation: DeviceInfo = new DeviceInfo();
  constructor(private Activatedroute: ActivatedRoute,
    private deviceService: DeviceService,
    private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceService.getDeviceInnerInfo(this.deviceId).subscribe(res1 => {
      this.deviceInformation.devicePlatform = res1['devicePlatform'];
      this.deviceInformation.os = res1['os'];
      this.deviceInformation.macAddress = res1['macAddress'];
    });
  }

  updateForm(){
    this.deviceState = "Inprogress";
    //const message ="We have saved your survey in the <a [routerLink] = this.router.navigate(['/survey/deviceList/'+this.deviceState])> In Progress </a> section. You can always go back to it and complete it.";
    this.deviceService.updateInUse(this.deviceId).subscribe(
      res1 => {
        console.log("Updated to not in use");
        this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: { deviceId: this.deviceId, inputRoute: "notUsed"}});
      }
    );
  }
}
