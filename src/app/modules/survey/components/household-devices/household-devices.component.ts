import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
export interface DeviceCount {
  newCount: number;
  inProgressCount: number;
  completedCount: number;
  notInUseCount: number;
}
@Component({
  selector: 'app-household-devices',
  templateUrl: './household-devices.component.html',
  styleUrls: ['./household-devices.component.css']
})

export class HouseholdDevicesComponent implements OnInit {

  showError: boolean = false;
  deviceCount: DeviceCount | undefined;
  constructor(private router: Router, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceService.getCustomRequest(DeviceConstants.deviceCountWithStatus).subscribe(response => {
      if (response) {
        this.showError = false;
        this.deviceCount = response;
      }
    }, err => this.showError = true,
      () => this.showError = true);
  }
}
