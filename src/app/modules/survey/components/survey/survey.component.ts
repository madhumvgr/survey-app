import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  constructor(private router: Router,private translate: TranslateService, private deviceService: DeviceService) { }

  ngOnInit(): void {
    // this.deviceService.getCustomRequest(DeviceConstants.deviceDetails).subscribe(response => {
    //   if (response) {
    //     this.showError = false;
    //     this.panelistType = response['panelistType'];
    //   }
    // }, err => this.showError = true,
    //   () => this.showError = true);
  }
  showWindow(){
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'),'name','width=600,height=400,top=200');
  }
}
