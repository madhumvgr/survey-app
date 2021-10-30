import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  showError: boolean = false;
  panelistType ='';
  constructor(private router: Router, private deviceService: DeviceService) { }

  ngOnInit(): void {
    // this.deviceService.getCustomRequest(DeviceConstants.deviceDetails).subscribe(response => {
    //   if (response) {
    //     this.showError = false;
    //     this.panelistType = response['panelistType'];
    //   }
    // }, err => this.showError = true,
    //   () => this.showError = true);
  }

}
