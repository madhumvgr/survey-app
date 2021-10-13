import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
export interface Device {
  description: string;
  deviceId: string;
  deviceName: string;
  deviceSurveryStatus: string;
  deviceType: string;
  estimationTime: string;
  macAddress: string;
  manufacturerName: string;
}

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  deviceState: any;
  devicesList: Device[]=[];

  constructor(private Activatedroute: ActivatedRoute, private router: Router, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceService.getCustomRequest(DeviceConstants.deviceListByStatus + this.deviceState).subscribe(response => {
      if (response) {
        this.devicesList = response;
      }
    });
  }

  navigateTo(device: Device) {
    this.router.navigateByUrl('survey/deviceInformation/' + this.deviceState + '/' + device.deviceId);
  }
}
