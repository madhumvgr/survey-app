import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../shared/shared.module';


import { DemographicsRoutingModule } from './demographics-routing.module';
import { DemographicOverviewComponent } from './components/demographic-overview/demographic-overview.component';
import { TestingComponent } from './components/testing/testing.component';
import { DemographicsHomeComponent } from './demographics-home.component';
import { DemograpgicsIndividualMembersComponent } from './components/demograpgics-individual-members/demograpgics-individual-members.component';
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
import { DemograpgicsOwnerComponent } from './components/demograpgics-owner/demograpgics-owner.component';
import { DemograpgicsOwnerConfirmationComponent } from './components/demograpgics-owner-confirmation/demograpgics-owner-confirmation.component';
import { DemograpgicsOwnerSurveyComponent } from './components/demograpgics-owner-survey/demograpgics-owner-survey.component';
import { DemograpgicsOwnerTermsComponent } from './components/demograpgics-owner-terms/demograpgics-owner-terms.component';
import { DemograpgicsOwnerThankyouComponent } from './components/demograpgics-owner-thankyou/demograpgics-owner-thankyou.component';
import { YesNoComponent } from './components/yesNo/yesNo.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadiogroupComponent } from './components/radiogroup/radiogroup.component';
import { QuestionarieComponent } from './components/questionarie/questionarie.component';
import { QuestionComponent } from './components/question/question.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatrixComponent } from './components/matrix/matrix.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';


@NgModule({
  declarations: [
    DemographicOverviewComponent,
    TestingComponent,
    DemographicsHomeComponent,
    DemograpgicsIndividualMembersComponent,
    DemograpgicsIndividualMembersConfirmationComponent,
    DemograpgicsIndividualMembersPage1Component,
    DemograpgicsIndividualMembersPage2Component,
    DemograpgicsIndividualMembersPage3Component,
    DemograpgicsIndividualMembersPage4Component,
    DemograpgicsIndividualMembersPage5Component,
    DemograpgicsIndividualMembersPage6Component,
    DemograpgicsIndividualMembersPage7Component,
    DemograpgicsIndividualMembersSignComponent,
    DemograpgicsIndividualMembersTermsComponent,
    DemograpgicsIndividualMembersThankyouComponent,
    DemograpgicsOwnerComponent,
    DemograpgicsOwnerConfirmationComponent,
    DemograpgicsOwnerSurveyComponent,
    DemograpgicsOwnerTermsComponent,
    DemograpgicsOwnerThankyouComponent,
    YesNoComponent,
    CheckboxComponent,
    RadiogroupComponent,
    QuestionarieComponent,
    QuestionComponent,
    MatrixComponent,
    DynamicFormComponent
  ],
  imports: [

    SharedModule,
    DemographicsRoutingModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    NgxPaginationModule
  ]
})
export class DemographicsModule { }
