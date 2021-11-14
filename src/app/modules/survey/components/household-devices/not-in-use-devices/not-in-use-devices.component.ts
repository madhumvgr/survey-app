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
    private localStorageService: LocalStorageService) { }

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
    this.deviceService.updateInUse(this.deviceId).subscribe(
      res1 => {
        console.log("Updated to not in use");
      }
    );
  }
}
