import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page401Component } from './components/page401/page401.component';
import { Page403Component } from './components/page403/page403.component';
import { AuthGuard } from './shared/services/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard] 
  },
  { path: 'login', loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule) },
  { path: 'survey', loadChildren: () => import(`./modules/survey/survey.module`).then(m => m.SurveyModule) ,canActivate: [AuthGuard] },
  { path: 'notification', loadChildren: () => import(`./modules/notification/notification.module`).then(m => m.NotificationModule),canActivate: [AuthGuard]  },
  {
    path: '401page',
    component: Page401Component
  },
  {
    path: '403page',
    component: Page403Component
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
