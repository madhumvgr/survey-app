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
import { DemograpgicsIndividualMembersThankyouComponent } from './components/demograpgics-individual-members-thankyou/demograpgics-individual-members-thankyou.component';
import { DemograpgicsOwnerComponent } from './components/demograpgics-owner/demograpgics-owner.component';
import { DemograpgicsOwnerConfirmationComponent } from './components/demograpgics-owner-confirmation/demograpgics-owner-confirmation.component';
import { DemograpgicsOwnerThankyouComponent } from './components/demograpgics-owner-thankyou/demograpgics-owner-thankyou.component';
import { YesNoComponent } from './components/yesNo/yesNo.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadiogroupComponent } from './components/radiogroup/radiogroup.component';
import { QuestionarieComponent } from './components/questionarie/questionarie.component';
import { QuestionComponent } from './components/question/question.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatrixComponent } from './components/matrix/matrix.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { MatrixTwoLevelComponent } from './components/matrix-two-level/matrix-two-level.component';
import { MatrixRbComponent } from './components/matrix-rb/matrix-rb.component';
import { MatrixSubLevelComponent } from './components/matrix-sub-level/matrix-sub-level.component';

@NgModule({
  declarations: [
    DemographicOverviewComponent,
    TestingComponent,
    DemographicsHomeComponent,
    DemograpgicsIndividualMembersComponent,
    DemograpgicsIndividualMembersConfirmationComponent,
    DemograpgicsIndividualMembersThankyouComponent,
    DemograpgicsOwnerComponent,
    DemograpgicsOwnerConfirmationComponent,
    DemograpgicsOwnerThankyouComponent,
    YesNoComponent,
    CheckboxComponent,
    RadiogroupComponent,
    QuestionarieComponent,
    QuestionComponent,
    MatrixComponent,
    DynamicFormComponent,
    MatrixTwoLevelComponent,
    MatrixRbComponent,
    MatrixSubLevelComponent
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
