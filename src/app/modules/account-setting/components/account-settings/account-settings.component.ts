import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  isRegister= false;
  notify = false;
  constructor(public authService: AuthService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.authService.isAuthenticatedUser(true);
  }

  registerForNotifi(){
    this.isRegister = true;
  }

  showWindow(){
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'),'name','width=600,height=400,top=200');
  }
}
