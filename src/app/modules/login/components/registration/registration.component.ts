import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../../services/user.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

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
  errorMessage: any;
  view = false;
  visible = false;
  isFocused = false;
  language: any;
  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.visible = true;
    this.view = true;
    this.show = true;
    this.hide = false;
    this.registerForm = this.fb.group({
     email: ['',  Validators.compose([
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ])],
     password: ['',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          this.customValidator.patternValidatorFn(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          this.customValidator.patternValidatorFn(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          this.customValidator.patternValidatorFn(/[a-z]/, {
            hasSmallCase: true
          }),
          Validators.minLength(8),
          Validators.maxLength(20)
        ])],
      confirmPassword: ['',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          this.customValidator.patternValidatorFn(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          this.customValidator.patternValidatorFn(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          this.customValidator.patternValidatorFn(/[a-z]/, {
            hasSmallCase: true
          }),
          Validators.minLength(8),
          Validators.maxLength(20)
        ])],
    }, {
      validator: this.customValidator.MustMatch('password', 'confirmPassword')
    }
    );
  }
  navigateTo() {
    this.hide = true;
  }

  // Only AlphaNumeric
  keyPressAlphaNumeric(event: any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9!@#$%^&*_+=()-]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  onFocusEvent(event: any) {
    this.isFocused = true;
  }

  // convenience getter for easy access to form fields
  get registerFormControl() { return this.registerForm.controls }
  onSubmit() {
    this.submitted = true;
    this.language = localStorage.lang;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      //get profileNo from local storage. 
      const profileId=this.localStorageService.getItem(StorageItem.PROFILEID);

      const registerUser= {
        profileId: profileId,
        login: this.registerFormControl.email.value,
        password: this.registerFormControl.password.value,
        langKey: this.language
      }
     // console.log(registerUser);
      this.userService.create(registerUser).subscribe( response => {
        console.log(response);
          this.showError=false;
          this.router.navigate(['login/registersuccess']);
        //}
      },
    
      err => {
       console.log(err.error.errorKey),
       this.showError=true,
       this.errorMessage = err.error.title });
      

      // () => this.showError=true);
    }
  }
}


