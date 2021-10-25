import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/account-settings/change-password/change-password.component';
import { PrivacyComponent } from './components/account-settings/privacy/privacy.component';
import { EmailNotificationsComponent } from './components/account-settings/email-notifications/email-notifications.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'account-settings-privacy', component: PrivacyComponent, canActivate: [AuthGuard] },
      { path: 'email-notifications', component: EmailNotificationsComponent, canActivate: [AuthGuard] }
    ],
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingRoutingModule { }
