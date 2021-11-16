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
import { SurveyHomeComponent } from './components/survey-home/survey-home.component';
import { SharedModule } from '../shared/shared.module';
import { DeviceUsageComponent } from './components/device-usage/device-usage.component';
import { DeviceGenresComponent } from './components/device-genres/device-genres.component';
import { CompletedDevicesViewComponent } from './components/completed-devices-view/completed-devices-view.component';
import { TelevisionComponent } from './components/television/television.component';
import { TelevisionRoutingModule } from './components/television.routing.module';
import { TvChannelsComponent } from './components/television/tv-channels/tv-channels.component';
import { TvGenresComponent } from './components/television/tv-genres/tv-genres.component';
@NgModule({
  declarations: [  SurveyComponent,
    HouseholdDevicesComponent,
    NotInUseDevicesComponent,
    DeviceListComponent,
    DeviceInformationComponent,
    DeviceOwnerInformationComponent,
    MultiUserListComponent,
    SurveyHomeComponent,
    DeviceUsageComponent,
    DeviceGenresComponent,
    CompletedDevicesViewComponent,
    TelevisionComponent,
    TvChannelsComponent,
    TvGenresComponent
  ],
  imports: [
    SurveyRoutingModule,
    TelevisionRoutingModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SurveyModule { 
  //  constructor (public authService:AuthService){
  //    this.authService.isAuthenticatedUser(true);
  //  }
  
}
