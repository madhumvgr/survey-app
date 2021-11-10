import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page401Component } from './components/page401/page401.component';
import { Page403Component } from './components/page403/page403.component';
import { HomeComponent } from './home/home.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { AuthGuard } from './shared/services/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatIconModule } from '@angular/material/icon'

const routes: Routes = [
  { 
    path: '', 
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [AuthGuard] 
      },
      { path: 'login', loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule) },
      { path: 'account-settings', loadChildren: () => import(`./modules/account-setting/account-setting.module`).then(m => m.AccountSettingModule) },
      { path: 'survey', loadChildren: () => import(`./modules/survey/survey.module`).then(m => m.SurveyModule) ,canActivate: [AuthGuard] },
      { path: 'notification', loadChildren: () => import(`./modules/notification/notification.module`).then(m => m.NotificationModule),canActivate: [AuthGuard]  },
      { path: 'support', loadChildren: () => import(`./modules/support/support.module`).then(m => m.SupportModule) },
      { path: '', pathMatch: 'full', redirectTo: 'login/registerkey' }
     ],
    component: HomeComponent
  },      
  {
    path: '401page',
    component: Page401Component
  },
  {
    path: '403page',
    component: Page403Component
  },
  { path: '**', component: PageNotfoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,MatIconModule] //,
})
export class AppRoutingModule { }
