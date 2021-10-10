import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { RegisterkeyComponent } from './components/registerkey/registerkey.component';
import { PrivacyComponent } from './components/menu/account-settings/privacy/privacy.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { MenuComponent } from './components/menu/menu.component';
import { AccountSettingsComponent } from './components/menu/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/menu/account-settings/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';

import { SurveyHubComponent } from './components/survey-hub/survey-hub.component';
import { HouseholdDevicesComponent } from './components/survey-hub/household-devices/household-devices.component';
import { DevicesComponent } from './components/survey-hub/devices/devices.component';
import { NewDevicesComponent } from './components/survey-hub/household-devices/new-devices/new-devices.component';
import { InProgressDevicesComponent } from './components/survey-hub/household-devices/in-progress-devices/in-progress-devices.component';
import { CompletedDevicesComponent } from './components/survey-hub/household-devices/completed-devices/completed-devices.component';
import { NotInUseDevicesComponent } from './components/survey-hub/household-devices/not-in-use-devices/not-in-use-devices.component';



@NgModule({
  declarations: [  RegistrationComponent,
    LoginComponent,
    CookiePolicyComponent,
    RegisterkeyComponent,
    PrivacyComponent,
    RegisterSuccessComponent,
    MenuComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,
    PrivacyComponent,
    ForgotPasswordComponent,
    DevicesComponent,
    SurveyHubComponent,
    HouseholdDevicesComponent,
    NewDevicesComponent,
    InProgressDevicesComponent,
    CompletedDevicesComponent,
    NotInUseDevicesComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class LoginModule { }
