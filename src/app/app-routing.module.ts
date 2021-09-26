import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RegisterkeyComponent} from './registerkey/registerkey.component'; 
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { AccountSettingsComponent } from './menu/account-settings/account-settings.component';
import { ChangePasswordComponent } from './menu/account-settings/change-password/change-password.component';
import { PrivacyComponent } from './menu/account-settings/privacy/privacy.component';

const routes: Routes = [
{path: 'login', 
component: LoginComponent},
{path: 'login/cookies',
component: CookiePolicyComponent},
{path: 'register',
component: RegistrationComponent},
{path: 'welcome',
component: WelcomeComponent},
{path: 'registerkey', component: RegisterkeyComponent},
{path: 'registersuccess', component: RegisterSuccessComponent},
{path: 'account-settings', component: AccountSettingsComponent},
{path:'update-password', component: ChangePasswordComponent},
{path:'account-settings-privacy', component: PrivacyComponent},
{path:'loginM', loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule)},
{path: '', pathMatch: 'full', redirectTo: 'registerkey'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
