import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelevisionRoutingModule } from './television.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TelevisionComponent } from './television.component';
import { TvChannelsComponent } from './components/tv-channels/tv-channels.component';
import { HouseholdMembersComponent } from './components/household-members/household-members.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TelevisionComponent,
    HouseholdMembersComponent,
    TvChannelsComponent
  ],
  imports: [
    SharedModule,
    TelevisionRoutingModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TelevisionModule { }
