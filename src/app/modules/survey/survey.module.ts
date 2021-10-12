import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './components/survey/survey.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HouseholdDevicesComponent } from './components/household-devices/household-devices.component';
import { NotInUseDevicesComponent } from './components/household-devices/not-in-use-devices/not-in-use-devices.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceInformationComponent } from './components/device-information/device-information.component';

@NgModule({
  declarations: [  SurveyComponent,
    HouseholdDevicesComponent,
    NotInUseDevicesComponent,
    DeviceListComponent,
    DeviceInformationComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SurveyModule { }
