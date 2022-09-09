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

  forgotForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  showError = false;
  language: any;

  constructor(private fb: FormBuilder,
    private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required]],
    }
    );
  }

  get forgotFormControl() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.language = localStorage.lang;

    if (this.forgotForm.valid) {
      console.table(this.forgotForm.value);
      //this.router.navigate(['/login/login']);

      let forgotPassword = {
        mail: this.forgotFormControl.email.value,
        lang: this.language
      }


      this.userService.initiateForgotPassword(forgotPassword).subscribe(response => {
        if (response) {
          this.showError = false;

        }
        this.router.navigate(['/login/reset/init']);

      },(error) => {
        this.showError = true;
      });
    }
  }

}
