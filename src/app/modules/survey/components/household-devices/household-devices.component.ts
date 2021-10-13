import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { UserService } from 'src/app/modules/login/services/user.service';

@Component({
  selector: 'app-household-devices',
  templateUrl: './household-devices.component.html',
  styleUrls: ['./household-devices.component.css']
})
export class HouseholdDevicesComponent implements OnInit {

  showError: boolean = false;
  panelistType ='';
  constructor(private router: Router, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceService.getUserDeviceDetails().subscribe(response => {
      if (response) {
        this.showError = false;
        console.log(response);
        // After successful sign in, we have to set username into localstorage
     //   this.router.navigate(['/welcome']);
      }
    }, err => this.showError = true,
      () => this.showError = true);
  }
}
