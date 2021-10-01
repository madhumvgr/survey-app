import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './components/message/message.component';
import { MessageCenterComponent } from './components/message/message-center/message-center.component';

@NgModule({
  declarations: [  MessageComponent, MessageCenterComponent ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class NotificationModule { }
