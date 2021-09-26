import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterkeyComponent } from './registerkey/registerkey.component';
import { PrivacyComponent } from './menu/account-settings/privacy/privacy.component';
import { AccountSettingsComponent } from './menu/account-settings/account-settings.component';
import { ChangePasswordComponent } from './menu/account-settings/change-password/change-password.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    RegistrationComponent,
    LoginComponent,
    CookiePolicyComponent,
    RegisterkeyComponent,
    PrivacyComponent,
    RegisterSuccessComponent,
    MenuComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
