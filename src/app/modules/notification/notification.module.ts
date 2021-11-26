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
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [  MessageComponent, MessageCenterComponent, ActionComponent, NotificationHomeComponent ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ]
})
export class NotificationModule {
  
 }
 export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
 }
