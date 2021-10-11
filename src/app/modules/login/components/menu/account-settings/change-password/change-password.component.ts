import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model: any = {};
  password: any;
  showRegistraion = true;
  showError = false;
  changePasswordForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  userService: any;
  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private authService: AuthService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, this.customValidator.patternValidator()]],
      newPassword: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    }, {
      validator: this.customValidator.MustMatch('newPassword', 'confirmPassword')
    }
    );
  }

  // convenience getter for easy access to form fields
  get changePasswordFormControl() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    } else {
      // update password in local storage.
      let username = localStorage.getItem('username');
      if (username) {
        let user: User = {
          username: username,
          currentPassword: this.changePasswordFormControl.currentPassword.value,
          newPassword: this.changePasswordFormControl.newPassword.value
        };
        this.userService.changePassword(user).subscribe((response: any) => {
          if (response) {
            this.showError = false;
            // After successful sign in, we have to set username into localstorage
            localStorage.setItem('id_token', response['id_token']);
            localStorage.setItem('username', this.changePasswordFormControl.email.value);
            this.router.navigate(['/login/login']);
          }
        });
      }
    }
  }
}
