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
import { FinishPasswordResetComponent } from './components/menu/account-settings/finish-password-reset/finish-password-reset.component';
import { KeyhelpComponent } from './components/registerkey/keyhelp/keyhelp.component';
import { PrivacyPolicyComponent } from './components/login/forgot-password/privacy-policy/privacy-policy.component';
import { EmailNotificationsComponent } from './components/menu/account-settings/email-notifications/email-notifications.component';
import { LoginHomeComponent } from './components/login-home/login-home.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


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
    FinishPasswordResetComponent,
    KeyhelpComponent,
    PrivacyPolicyComponent,
    EmailNotificationsComponent,
    LoginHomeComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    TranslateModule 
  ]
})
export class LoginModule { }
