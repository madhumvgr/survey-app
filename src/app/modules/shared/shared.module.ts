import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    NgbModule,
    TranslateModule 
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    ModalComponent
  ]
})
export class SharedModule { }
