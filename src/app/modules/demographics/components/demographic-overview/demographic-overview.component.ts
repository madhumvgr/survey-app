import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as Survey from 'survey-angular';

@Component({
  selector: 'app-demographic-overview',
  templateUrl: './demographic-overview.component.html',
  styleUrls: ['./demographic-overview.component.css']
})
export class DemographicOverviewComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {

  }

  showWindow(){
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'),'name','width=600,height=400,top=200');
  }


}
