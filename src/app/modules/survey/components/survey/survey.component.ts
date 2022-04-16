import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  showError: boolean = false;
  panelistType: any;
  isNotOnlyDevices: boolean = true;
  
  constructor(private router: Router, private localStorageService: LocalStorageService, private translate: TranslateService, private deviceService: DeviceService) { }

  ngOnInit(): void {

    this.panelistType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
    // this.deviceService.getCustomRequest(DeviceConstants.deviceDetails).subscribe(response => {
    //   if (response) {
    //     this.showError = false;
    //     this.panelistType = response['panelistType'];
    //   }
    // }, err => this.showError = true,
    //   () => this.showError = true);
    
    // this.deviceService.getExistingHomes().subscribe(existingHomes => { 
    // if (existingHomes && existingHomes.panels) {
    //   const panelIds = existingHomes.panels.map((obj: any) => obj.id);
    //   console.log(panelIds);
    //   const filteredArray = panelIds.filter((value:any) => ['620','621','630','631'].includes(value));
    //   this.isNotOnlyDevices = filteredArray.length ? true : false;
    // }
    // });
  }

  showWindow() {
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'), 'name', 'width=600,height=400,top=200');
  }
}
