import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SupportRoutingModule } from './support-routing.module';
import { TechsupportComponent } from './techsupport/techsupport.component';

import { FaqsComponent } from './faqs/faqs/faqs.component';
import { ConnectComponent } from './connect/connect.component';
import { ContactComponent } from './contact/contact.component';
import { ExitComponent } from './exit/exit.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';






@NgModule({
  declarations: [
    TechsupportComponent,
    FaqsComponent,
    ConnectComponent,
    ContactComponent,
    ExitComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
 
})
export class SupportModule { }
