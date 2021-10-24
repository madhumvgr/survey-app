import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword, User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup =this.fb.group({});
  submitted = false;
  showInvalidError =false;
  showError = false;
  
  constructor(private fb: FormBuilder,
    private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
       }
    );
  }

  get forgotFormControl() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotForm.valid) {
      console.table(this.forgotForm.value);
      let forgotPassword = this.forgotFormControl.email.value;
      this.userService.initiateForgotPassword(forgotPassword).subscribe(response => {
        if (response) {
          this.showError = false;
        }
      }, err => this.showError = true,
        () => this.showError = true)
    }
  }

}
