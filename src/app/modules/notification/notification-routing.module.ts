import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './components/message/message.component';

const routes: Routes = [
{path: 'message', 
component: MessageComponent},
{path: '', pathMatch: 'full', redirectTo: 'message'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
