import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { RegisterkeyComponent } from './components/registerkey/registerkey.component';
import { PrivacyComponent } from '../account-setting/components/account-settings/privacy/privacy.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { MenuComponent } from './components/menu/menu.component';
import { AccountSettingsComponent } from '../account-setting/components/account-settings/account-settings.component';
import { ChangePasswordComponent } from '../account-setting/components/account-settings/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { FinishPasswordResetComponent } from '../account-setting/components/account-settings/finish-password-reset/finish-password-reset.component';
import { KeyhelpComponent } from './components/registerkey/keyhelp/keyhelp.component';
import { PrivacyPolicyComponent } from './components/login/forgot-password/privacy-policy/privacy-policy.component';
import { EmailNotificationsComponent } from '../account-setting/components/account-settings/email-notifications/email-notifications.component';
import { LoginHomeComponent } from './components/login-home/login-home.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [  RegistrationComponent,
    LoginComponent,
    CookiePolicyComponent,
    RegisterkeyComponent,
    RegisterSuccessComponent,
    MenuComponent,
    ForgotPasswordComponent,
    FinishPasswordResetComponent,
    KeyhelpComponent,
   
    PrivacyPolicyComponent,
    LoginHomeComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    MatIconModule,MatFormFieldModule,MatInputModule
  ]
})
export class LoginModule { }
