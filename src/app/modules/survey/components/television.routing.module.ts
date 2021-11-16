import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelevisionComponent } from './television/television.component';
import { HouseholdMembersComponent } from './television/household-members/household-members.component';
import { TvGenresComponent } from './television/tv-genres/tv-genres.component';
import { TvChannelsComponent } from './television/tv-channels/tv-channels.component';
import { ThankyouComponent } from './television/thankyou/thankyou.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'household-members', component: HouseholdMembersComponent },
      { path: 'tv-genres', component: TvGenresComponent },
      { path: 'tv-channels', component: TvChannelsComponent },
      { path: 'thankyou', component: ThankyouComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login/registerkey' }
    ],
    component: TelevisionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    HouseholdMembersComponent
  ]
})
export class TelevisionRoutingModule { }
