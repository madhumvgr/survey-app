import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageCenterComponent } from './components/message/message-center/message-center.component';
import { MessageComponent } from './components/message/message.component';

const routes: Routes = [
{path: 'messages', 
component: MessageCenterComponent},
{path: 'messages/message', component: MessageComponent},
{path: '', pathMatch: 'full', redirectTo: 'messages'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
