import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankyouComponent } from '../account-setting/components/account-settings/thankyou/thankyou.component';
import { DemograpgicsIndividualMembersConfirmationComponent } from './components/demograpgics-individual-members-confirmation/demograpgics-individual-members-confirmation.component';
import { DemograpgicsIndividualMembersPage1Component } from './components/demograpgics-individual-members-page1/demograpgics-individual-members-page1.component';
import { DemograpgicsIndividualMembersPage2Component } from './components/demograpgics-individual-members-page2/demograpgics-individual-members-page2.component';
import { DemograpgicsIndividualMembersPage3Component } from './components/demograpgics-individual-members-page3/demograpgics-individual-members-page3.component';
import { DemograpgicsIndividualMembersPage4Component } from './components/demograpgics-individual-members-page4/demograpgics-individual-members-page4.component';
import { DemograpgicsIndividualMembersPage5Component } from './components/demograpgics-individual-members-page5/demograpgics-individual-members-page5.component';
import { DemograpgicsIndividualMembersPage6Component } from './components/demograpgics-individual-members-page6/demograpgics-individual-members-page6.component';
import { DemograpgicsIndividualMembersPage7Component } from './components/demograpgics-individual-members-page7/demograpgics-individual-members-page7.component';
import { DemograpgicsIndividualMembersSignComponent } from './components/demograpgics-individual-members-sign/demograpgics-individual-members-sign.component';
import { DemograpgicsIndividualMembersTermsComponent } from './components/demograpgics-individual-members-terms/demograpgics-individual-members-terms.component';
import { DemograpgicsIndividualMembersThankyouComponent } from './components/demograpgics-individual-members-thankyou/demograpgics-individual-members-thankyou.component';
import { DemograpgicsIndividualMembersComponent } from './components/demograpgics-individual-members/demograpgics-individual-members.component';
import { DemograpgicsOwnerConfirmationComponent } from './components/demograpgics-owner-confirmation/demograpgics-owner-confirmation.component';
import { DemograpgicsOwnerSurveyComponent } from './components/demograpgics-owner-survey/demograpgics-owner-survey.component';
import { DemograpgicsOwnerTermsComponent } from './components/demograpgics-owner-terms/demograpgics-owner-terms.component';
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
      { path: 'demographics-individual-members-page1', component: DemograpgicsIndividualMembersPage1Component },
      { path: 'demographics-individual-members-page2', component: DemograpgicsIndividualMembersPage2Component },
      { path: 'demographics-individual-members-page3', component: DemograpgicsIndividualMembersPage3Component },
      { path: 'demographics-individual-members-page4', component: DemograpgicsIndividualMembersPage4Component },
      { path: 'demographics-individual-members-page5', component: DemograpgicsIndividualMembersPage5Component },
      { path: 'demographics-individual-members-page6', component: DemograpgicsIndividualMembersPage6Component },
      { path: 'demographics-individual-members-page7', component: DemograpgicsIndividualMembersPage7Component },
      { path: 'demographics-individual-members-sign', component: DemograpgicsIndividualMembersSignComponent },
      { path: 'demographics-individual-members-terms', component: DemograpgicsIndividualMembersTermsComponent },
      { path: 'demographics-individual-members-thankyou', component: DemograpgicsIndividualMembersThankyouComponent },
      { path: 'demographics-owner', component: DemograpgicsOwnerComponent },
      { path: 'demographics-owner-confirmation', component: DemograpgicsOwnerConfirmationComponent },
      { path: 'demographics-owner-survey', component: DemograpgicsOwnerSurveyComponent },
      { path: 'demographics-owner-terms', component: DemograpgicsOwnerTermsComponent },
      { path: 'demographics-owner-thankyou', component: DemograpgicsOwnerThankyouComponent },
      { path: 'questionaire/:memberNo/:homeNo/:pageNo', component: QuestionarieComponent },
      { path: 'questionaire/:houseHold/:memberNo/:pageNo/:houseHold1', component: QuestionarieComponent },
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
