import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
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
  userSize:any;
  ownerInfo: any;
  panelListType: any;

  constructor(private Activatedroute: ActivatedRoute, private router: Router, private deviceService: DeviceService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
   // this.deviceState = "Completed";
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
    this.panelListType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);

    this.deviceService.getDeviceInnerInfo(this.deviceId).subscribe( res1 => {
      this.deviceInformation.devicePlatform=res1['devicePlatform'];
      this.deviceInformation.os=res1['os'];
      this.deviceInformation.macAddress=res1['macAddress'];
      this.deviceInformation.deviceName=res1['deviceName']
     });
     this.deviceService.getDeviceInfo(this.deviceId).subscribe(res => { 
      this.userSize = res.numberOfUsers;
    });
  
    this.deviceService.getCustomRequest(DeviceConstants.deviceOwnerByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
          this.ownerInfo  = response;
      }
    });
  }

  

preSelectPage(genres: boolean) {
  if(genres){
    this.router.navigate(['survey/selectGeneres/'+this.deviceState+'/'+this.ownerInfo.memberNo+'/'+this.deviceId], { state: { memberName: this.ownerInfo.memberName }, queryParams: {isNotAutoSave: true} });
  } else{
    this.router.navigate(['survey/selectChannel/' + this.deviceState + '/' +this.ownerInfo.memberNo + '/' + this.deviceId+ '/' +true],{ state: { memberName: this.ownerInfo.memberName }, queryParams: {isNotAutoSave: true} });         

  }

}
}