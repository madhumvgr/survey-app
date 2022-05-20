import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
export interface Device {
  description: string;
  deviceId: string;
  deviceName: string;
  deviceSurveryStatus: string;
  deviceType: string;
  estimationTime: string;
  macAddress: string;
  manufacturerName: string;
  iconDescription: string;
}

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  deviceState: any;
  devicesList: Device[] = [];

  deviceCount: number = 0;
  deviceStatus: any;
  //userType = "SSP";
  userType = localStorage.panellistType;

  constructor(private Activatedroute: ActivatedRoute, 
    private localStorageService: LocalStorageService,
    private router: Router, private deviceService: DeviceService, private translate: TranslateService) {
      
     }

  ngOnInit(): void {
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    if(this.deviceState =="Inprogress") {
      this.deviceStatus = "In Progress"
    }else if(this.deviceState =="Notused") {
      this.deviceStatus = "Not in Use"
    } else if(this.deviceState =="InProgress"){
      this.deviceState =="Inprogress";
    }else{
      this.deviceStatus = this.deviceState;
    }
    this.deviceService.getCustomRequest(DeviceConstants.deviceListByStatus + this.deviceState + '?userType=' + this.userType).subscribe(response => {
      if (response) {
        this.devicesList = response;
        this.deviceCount = this.devicesList.length;
        this.devicesList.forEach((device: Device) => {
          device['iconDescription'] = this.getMatIconDescription(device.deviceType);
        });
      }
    });
  }

  navigateTo(device: Device) {
    this.localStorageService.setDeviceName(device['deviceName']);
    if(device.deviceSurveryStatus == 'Completed') {
      this.router.navigateByUrl('survey/completed-devices/' + this.deviceState + '/' + device.deviceId);
    } else if(device.deviceSurveryStatus == 'Notused'){
      this.router.navigateByUrl('survey/not-in-use-devices/' + this.deviceState + '/' + device.deviceId);
    }
     else {
    this.router.navigateByUrl('survey/deviceInformation/' + this.deviceState + '/' + device.deviceId);
    }
  }

  getMatIconDescription(deviceType: any) {
    switch (deviceType) {
      case "Smart TV":
        return "personal_video";
      case "Laptop":
        return "laptop";
      case "Mobile":
        return "phone_iphone";
      case "Gaming":
        return "videogame_asset";
      case "Devices Other":
        return "devices_other";    
      case "PC/MAC":
        return "desktop_mac";  
      case "PC Desktop":
        return "desktop_windows";
      case "SMARTPHONE":
        return "smartphone";
      default:
        return "devices_other";
    }
  }
  showWindow(){
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'),'name','width=600,height=400,top=200');
  }
}
