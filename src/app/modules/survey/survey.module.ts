import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './components/survey/survey.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DevicesComponent } from './components/devices/devices.component';
import { HouseholdDevicesComponent } from './components/household-devices/household-devices.component';
import { CompletedDevicesComponent } from './components/household-devices/completed-devices/completed-devices.component';
import { InProgressDevicesComponent } from './components/household-devices/in-progress-devices/in-progress-devices.component';
import { NewDevicesComponent } from './components/household-devices/new-devices/new-devices.component';
import { NotInUseDevicesComponent } from './components/household-devices/not-in-use-devices/not-in-use-devices.component';

@NgModule({
  declarations: [  SurveyComponent,
    DevicesComponent,
    HouseholdDevicesComponent,
    CompletedDevicesComponent,
    InProgressDevicesComponent,
    NewDevicesComponent,
    NotInUseDevicesComponent
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
