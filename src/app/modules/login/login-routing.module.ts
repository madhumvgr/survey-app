import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { AccountSettingsComponent } from './components/menu/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/menu/account-settings/change-password/change-password.component';
import { PrivacyComponent } from './components/menu/account-settings/privacy/privacy.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { RegisterkeyComponent } from './components/registerkey/registerkey.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DevicesComponent } from './components/survey-hub/devices/devices.component';
import { CompletedDevicesComponent } from './components/survey-hub/household-devices/completed-devices/completed-devices.component';
import { HouseholdDevicesComponent } from './components/survey-hub/household-devices/household-devices.component';
import { InProgressDevicesComponent } from './components/survey-hub/household-devices/in-progress-devices/in-progress-devices.component';
import { NewDevicesComponent } from './components/survey-hub/household-devices/new-devices/new-devices.component';
import { NotInUseDevicesComponent } from './components/survey-hub/household-devices/not-in-use-devices/not-in-use-devices.component';
import { SurveyHubComponent } from './components/survey-hub/survey-hub.component';

const routes: Routes = [
{path: 'login', 
component: LoginComponent},
{path: 'cookies',
component: CookiePolicyComponent},
{path: 'register',
component: RegistrationComponent},
{path: 'registerkey', component: RegisterkeyComponent},
{path: 'registersuccess', component: RegisterSuccessComponent},
{path: 'account-settings', component: AccountSettingsComponent},
{path:'update-password', component: ChangePasswordComponent},
{path:'account-settings-privacy', component: PrivacyComponent},
{path: 'forgot-password', component: ForgotPasswordComponent},
{path: 'survey-hub', component: SurveyHubComponent},
{path: 'devices', component: DevicesComponent},
{path: 'survey-hub/household-devices', component: HouseholdDevicesComponent},
{path:'survey-hub/household-devices/new-devices', component:NewDevicesComponent},
{path:'survey-hub/household-devices/inprogress-devices', component:InProgressDevicesComponent},
{path:'survey-hub/household-devices/completed-devices', component:CompletedDevicesComponent},
{path:'survey-hub/household-devices/not-in-use-devices', component:NotInUseDevicesComponent},
{path: '', pathMatch: 'full', redirectTo: 'registerkey'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
