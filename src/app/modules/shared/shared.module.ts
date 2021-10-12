import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyStartComponent } from './survey-start/survey-start.component';
import { DeviceOwnerInformationComponent } from './device-owner-information/device-owner-information.component';
import { MultiUserListComponent } from './multi-user-list/multi-user-list.component';
import { DeviceUsageComponent } from './device-usage/device-usage.component';
import { DeviceGenresComponent } from './device-genres/device-genres.component';



@NgModule({
  declarations: [
    SurveyStartComponent,
    DeviceOwnerInformationComponent,
    MultiUserListComponent,
    DeviceUsageComponent,
    DeviceGenresComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
