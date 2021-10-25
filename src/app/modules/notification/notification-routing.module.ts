import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './components/message/message.component';
import { ActionComponent } from './components/message/action/action.component';
import { MessageCenterComponent } from './components/message-center/message-center.component';
import { NotificationHomeComponent } from './notification-home/notification-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'messages', component: MessageCenterComponent },
      { path: 'message/:messageId', component: MessageComponent },
      { path: 'messages/message', component: MessageComponent },
      { path: 'messages/action', component: ActionComponent },
      {path: 'messages/action/:messageId', component: ActionComponent},
      { path: '', pathMatch: 'full', redirectTo: 'login/registerkey' }
    ],
    component: NotificationHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
