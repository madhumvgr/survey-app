import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AccountSettingRoutingModule } from './account-setting-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PrivacyComponent } from './components/account-settings/privacy/privacy.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/account-settings/change-password/change-password.component';
import { EmailNotificationsComponent } from './components/account-settings/email-notifications/email-notifications.component';
import { MatIconModule } from '@angular/material/icon';
import { ThankyouComponent } from './components/account-settings/thankyou/thankyou.component';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [
    HomeComponent,
    PrivacyComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,
    EmailNotificationsComponent,
    ThankyouComponent,
  ],
  imports: [
    CommonModule,
    AccountSettingRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    MatIconModule
  ],
  providers: [Title],
})
export class AccountSettingModule { }
