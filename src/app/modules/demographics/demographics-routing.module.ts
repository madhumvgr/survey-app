import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankyouComponent } from '../account-setting/components/account-settings/thankyou/thankyou.component';
import { DemograpgicsIndividualMembersConfirmationComponent } from './components/demograpgics-individual-members-confirmation/demograpgics-individual-members-confirmation.component';
import { DemograpgicsIndividualMembersThankyouComponent } from './components/demograpgics-individual-members-thankyou/demograpgics-individual-members-thankyou.component';
import { DemograpgicsIndividualMembersComponent } from './components/demograpgics-individual-members/demograpgics-individual-members.component';
import { DemograpgicsOwnerConfirmationComponent } from './components/demograpgics-owner-confirmation/demograpgics-owner-confirmation.component';
import { DemograpgicsOwnerThankyouComponent } from './components/demograpgics-owner-thankyou/demograpgics-owner-thankyou.component';
import { DemograpgicsOwnerComponent } from './components/demograpgics-owner/demograpgics-owner.component';
import { DemographicOverviewComponent } from './components/demographic-overview/demographic-overview.component';
import { QuestionarieComponent } from './components/questionarie/questionarie.component';
import { DemographicsHomeComponent } from './demographics-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'demographics-overview', component: DemographicOverviewComponent },
      { path: 'demographics-individual-members', component: DemograpgicsIndividualMembersComponent },
      { path: 'demographics-individual-members-confirmation', component: DemograpgicsIndividualMembersConfirmationComponent },
      { path: 'demographics-individual-members-thankyou', component: DemograpgicsIndividualMembersThankyouComponent },
      { path: 'demographics-owner', component: DemograpgicsOwnerComponent },
      { path: 'demographics-owner-confirmation', component: DemograpgicsOwnerConfirmationComponent },
      { path: 'demographics-owner-thankyou', component: DemograpgicsOwnerThankyouComponent },
      { path: 'questionaire/:memberNo/:homeNo/:pageNo', component: QuestionarieComponent },
      { path: 'questionaire/:houseHold/:memberNo/:houseHold1/:pageNo', component: QuestionarieComponent },
      { path: 'Thankyou', component: ThankyouComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login/registerkey' }
    ],
    component: DemographicsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemographicsRoutingModule { }
