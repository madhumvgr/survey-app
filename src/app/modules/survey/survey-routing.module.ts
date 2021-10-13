import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceGenresComponent } from './components/device-genres/device-genres.component';
import { DeviceInformationComponent } from './components/device-information/device-information.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceOwnerInformationComponent } from './components/device-owner-information/device-owner-information.component';
import { DeviceUsageComponent } from './components/device-usage/device-usage.component';
import { HouseholdDevicesComponent } from './components/household-devices/household-devices.component';
import { NotInUseDevicesComponent } from './components/household-devices/not-in-use-devices/not-in-use-devices.component';
import { MultiUserListComponent } from './components/multi-user-list/multi-user-list.component';
import { SurveyComponent } from './components/survey/survey.component';


const routes: Routes = [
{path: 'survey', component: SurveyComponent},
{path: 'deviceList/:state', component: DeviceListComponent},
{path: 'deviceInformation/:state/:deviceId', component: DeviceInformationComponent},
{path: 'deviceOwnerInformation/:state/:deviceId', component: DeviceOwnerInformationComponent},
{path: 'multiUserList/:state/:deviceId', component: MultiUserListComponent},
{path: 'deviceUsage/:state/:deviceId', component: DeviceUsageComponent},
{path: 'deviceGeneres/:state/:deviceId', component: DeviceGenresComponent},
{path: 'household-devices', component: HouseholdDevicesComponent},
{path: '', pathMatch: 'full', redirectTo: 'registerkey'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
