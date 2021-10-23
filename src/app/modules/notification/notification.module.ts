import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionComponent } from './components/message/action/action.component';
import { MessageCenterComponent } from './components/message-center/message-center.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [  MessageComponent, MessageCenterComponent, ActionComponent ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class NotificationModule { }
