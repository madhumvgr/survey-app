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
import { DeviceOwnerInformationComponent } from './components/device-owner-information/device-owner-information.component';
import { MultiUserListComponent } from './components/multi-user-list/multi-user-list.component';
import { AuthService } from 'src/app/shared/services/auth.service';
@NgModule({
  declarations: [  SurveyComponent,
    HouseholdDevicesComponent,
    NotInUseDevicesComponent,
    DeviceListComponent,
    DeviceInformationComponent,
    DeviceOwnerInformationComponent,
    MultiUserListComponent,
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SurveyModule { 
   constructor (public authService:AuthService){
     this.authService.isAuthenticatedUser(true);
   }
  
}
