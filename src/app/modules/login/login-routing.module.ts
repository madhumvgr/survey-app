import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
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
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'finish-password-reset/:username/:resetKey', component: FinishPasswordResetComponent },
  { path: 'account-settings-privacy', component: PrivacyComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', pathMatch: 'full', redirectTo: 'registerkey' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
