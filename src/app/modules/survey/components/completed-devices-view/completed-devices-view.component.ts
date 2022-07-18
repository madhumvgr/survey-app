import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { DeviceInfo } from '../device-information/device-information.component';

@Component({
  selector: 'app-completed-devices-view',
  templateUrl: './completed-devices-view.component.html',
  styleUrls: ['./completed-devices-view.component.css']
})
export class CompletedDevicesViewComponent implements OnInit {
  deviceState: string = '';
  deviceId: string  = '';
  deviceName: any;
  deviceInformation : DeviceInfo = new DeviceInfo();

  constructor(private Activatedroute: ActivatedRoute,  private deviceService: DeviceService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
   // this.deviceState = "Completed";
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);

    this.deviceService.getDeviceInnerInfo(this.deviceId).subscribe( res1 => {
      this.deviceInformation.devicePlatform=res1['devicePlatform'];
      this.deviceInformation.os=res1['os'];
      this.deviceInformation.macAddress=res1['macAddress'];
      this.deviceInformation.deviceName=res1['deviceName']
     });
  }

}
