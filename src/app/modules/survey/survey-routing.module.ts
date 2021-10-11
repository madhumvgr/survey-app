import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './components/devices/devices.component';
import { CompletedDevicesComponent } from './components/household-devices/completed-devices/completed-devices.component';
import { HouseholdDevicesComponent } from './components/household-devices/household-devices.component';
import { InProgressDevicesComponent } from './components/household-devices/in-progress-devices/in-progress-devices.component';
import { NewDevicesComponent } from './components/household-devices/new-devices/new-devices.component';
import { NotInUseDevicesComponent } from './components/household-devices/not-in-use-devices/not-in-use-devices.component';
import { SurveyComponent } from './components/survey/survey.component';


const routes: Routes = [
{path: 'survey', component: SurveyComponent},
{path: 'devices', component: DevicesComponent},
{path: 'household-devices', component: HouseholdDevicesComponent},
{path:'household-devices/new-devices', component:NewDevicesComponent},
{path:'household-devices/inprogress-devices', component:InProgressDevicesComponent},
{path:'household-devices/completed-devices', component:CompletedDevicesComponent},
{path:'household-devices/not-in-use-devices', component:NotInUseDevicesComponent},
{path: '', pathMatch: 'full', redirectTo: 'registerkey'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
