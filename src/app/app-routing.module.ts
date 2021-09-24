import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
{path: 'login', 
component: LoginComponent},
{path: 'login/cookies',
component: CookiePolicyComponent},
{path: 'register',
component: RegistrationComponent},
{path: 'welcome',
component: WelcomeComponent},
{path: '', pathMatch: 'full', redirectTo: 'register'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
