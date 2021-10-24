import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionComponent } from './components/message/action/action.component';
import { MessageCenterComponent } from './components/message-center/message-center.component';
import { MessageComponent } from './components/message/message.component';
import { NotificationHomeComponent } from './notification-home/notification-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [  MessageComponent, MessageCenterComponent, ActionComponent, NotificationHomeComponent ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class NotificationModule { }
