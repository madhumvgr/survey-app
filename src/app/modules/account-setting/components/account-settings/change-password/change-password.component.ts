import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/modules/login/services/user.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model: any = {};
  hide = false;
  password: any;
  showRegistraion = true;
  showError = false;
  changePasswordForm: FormGroup = this.fb.group({});
  showInvalidError = false;
  submitted = false;
  show = false;
  view = false;
  visible = false;
  userobj: User = {};
  confPass = false;


  showPassword!: boolean;
  isFocused = false;
  //showInvalidError = false;
  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private localStorageService: LocalStorageService,
    private router: Router, public userService: UserService) {
  }
  ngOnInit(): void {
    this.visible = true;
    this.view = true;
    this.show = true;
    this.hide = false;
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['',
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
      validator: this.customValidator.MustMatch('newPassword', 'confirmPassword')
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
  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  checkValidate(pass: any) {
    if(!pass.target.value) {
      this.confPass = true;;
    } else{
      this.confPass = false;
    }
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      let name = this.localStorageService.getItem(StorageItem.USERNAME);
      if (name) {
        this.userobj = {
          username: name,
          currentPassword: this.changePasswordFormControl.currentPassword.value,
          newPassword: this.changePasswordFormControl.newPassword.value
        }
      }
      this.userService.changePassword(this.userobj).subscribe((response: string) => {
        if (response) {
          this.showError = false;
        const message ='changePassword.message'
          this.router.navigate(['/account-settings/thankyou/Change password'], { state: { message: message } });
          //this.router.navigate(['/welcome']);
        }
      }, err => this.showError = true);
    } else {
      this.submitted = true;
    }

  }

}


