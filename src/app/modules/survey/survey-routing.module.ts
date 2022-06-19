import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingChangesGuard } from 'src/app/shared/services/pending-changes.guard';
import { ThankyouComponent } from '../account-setting/components/account-settings/thankyou/thankyou.component';
import { PrivacyPolicyComponent } from '../login/components/login/forgot-password/privacy-policy/privacy-policy.component';
import { TvChannelsComponent } from '../television/components/tv-channels/tv-channels.component';
import { CompletedDevicesViewComponent } from './components/completed-devices-view/completed-devices-view.component';
import { DeviceGenresComponent } from './components/device-genres/device-genres.component';
import { DeviceInformationComponent } from './components/device-information/device-information.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceOwnerInformationComponent } from './components/device-owner-information/device-owner-information.component';
import { DeviceUsageComponent } from './components/device-usage/device-usage.component';
import { HouseholdDevicesComponent } from './components/household-devices/household-devices.component';
import { NotInUseDevicesComponent } from './components/household-devices/not-in-use-devices/not-in-use-devices.component';
import { MultiUserListComponent } from './components/multi-user-list/multi-user-list.component';
import { SelectChannelComponent } from './components/select-channel/select-channel.component';
import { SelectGenresComponent } from './components/select-genres/select-genres.component';
import { SurveyHomeComponent } from './components/survey-home/survey-home.component';
import { SurveyComponent } from './components/survey/survey.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'survey', component: SurveyComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'deviceList/:state', component: DeviceListComponent },
      { path: '/survey/deviceList/New', component: DeviceListComponent },
      { path: 'deviceInformation/:state/:deviceId', component: DeviceInformationComponent, canDeactivate: [PendingChangesGuard] },
      { path: 'deviceOwnerInformation/:state/:deviceId', component: DeviceOwnerInformationComponent },
      { path: 'multiUserList/:state/:deviceId', component: MultiUserListComponent },
      { path: 'deviceUsage/:state/:deviceId', component: DeviceUsageComponent },
      { path: 'deviceGeneres/:state/:memberNo/:deviceId', component: DeviceGenresComponent },
      { path: 'selectGeneres/:state/:memberNo/:deviceId', component: SelectGenresComponent, canDeactivate: [PendingChangesGuard] },
      { path: 'selectChannel/:state/:memberNo/:deviceId/:list', component: SelectChannelComponent },
      { path: 'deviceChannels/:state/:memberNo/:deviceId', component: TvChannelsComponent },
      { path: 'household-devices', component: HouseholdDevicesComponent },
      { path: 'not-in-use-devices/:state/:deviceId', component: NotInUseDevicesComponent },
      { path: 'completed-devices/:state/:deviceId', component: CompletedDevicesViewComponent},
      {path:  'tv-Channels/:state/:deviceId/:memberNo/:userCount/:list', component: TvChannelsComponent },
      { path: 'Thankyou', component: ThankyouComponent },
      { path: 'device/Thankyou/:state/:deviceId', component: ThankyouComponent },
      { path: 'Thankyou/deviceList/:state', component: ThankyouComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login/registerkey' },
      ],
    component: SurveyHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
