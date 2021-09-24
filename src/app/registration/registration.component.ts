import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../services/customvalidation.service';
import { AuthService } from '../shared/models/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  password: any;
  showRegistraion = true;
  registerForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    }, {
      validator: this.customValidator.MustMatch('password', 'confirmPassword')
    }
    );
  }

  // convenience getter for easy access to form fields
  get registerFormControl() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.router.navigate(['login']);
    }
  }
}


