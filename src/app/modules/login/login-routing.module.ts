import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { AccountSettingsComponent } from './components/menu/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/menu/account-settings/change-password/change-password.component';
import { FinishPasswordResetComponent } from './components/menu/account-settings/finish-password-reset/finish-password-reset.component';
import { PrivacyComponent } from './components/menu/account-settings/privacy/privacy.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { RegisterkeyComponent } from './components/registerkey/registerkey.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { KeyhelpComponent } from './components/registerkey/keyhelp/keyhelp.component';
import { PrivacyPolicyComponent } from './components/login/forgot-password/privacy-policy/privacy-policy.component';
import { EmailNotificationsComponent } from './components/menu/account-settings/email-notifications/email-notifications.component';
import { LoginHomeComponent } from './components/login-home/login-home.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'cookies',
        component: CookiePolicyComponent
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      { path: 'registerkey', component: RegisterkeyComponent },
      { path: 'registersuccess', component: RegisterSuccessComponent },
      { path: 'account-settings', component: AccountSettingsComponent, canActivate:[AuthGuard]},
      { path: 'change-password', component: ChangePasswordComponent, canActivate:[AuthGuard] },
      { path: 'finish-password-reset/:resetKey', component: FinishPasswordResetComponent },
      { path: 'account-settings-privacy', component: PrivacyComponent,canActivate:[AuthGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'email-notifications', component: EmailNotificationsComponent,canActivate:[AuthGuard]},
      {path: 'keyhelp', component: KeyhelpComponent},
      {path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate:[AuthGuard]},
      
      { path: '', pathMatch: 'full', redirectTo: 'registerkey' }
     ],
    component: LoginHomeComponent
  }  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
