import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  show=false;
  hide=true;
  model: any = {};
  password: any;
  showRegistraion = true;
  registerForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  showError= false;
  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.show=true;
    this.hide=true;
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
  get registerFormControl() { return this.registerForm.controls }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      //get profileNo from local storage. 
      const profileId=localStorage.getItem('profileId');

      const registerUser= {
        profileId: profileId,
        login: this.registerFormControl.email.value,
        password: this.registerFormControl.password.value
      }
      console.log(registerUser);
      this.userService.create(registerUser).subscribe( response => {
          this.showError=false;
          this.router.navigate(['login/registersuccess']);
        //}
      },err => this.showError=true,
      () => this.showError=true);
    }
  }
}


