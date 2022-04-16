import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/modules/login/services/user.service';

@Component({
  selector: 'app-finish-password-reset',
  templateUrl: './finish-password-reset.component.html',
  styleUrls: ['./finish-password-reset.component.css']
})
export class FinishPasswordResetComponent implements OnInit {
  show = false;
  hide = true;
  model: any = {};
  password: any;
  showRegistraion = true;
  registerForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  showError = false;
  errorMessage: any;
  resetKey: any;

  constructor(private Activatedroute: ActivatedRoute, private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService) {
    this.show = true;
    this.hide = true;
    this.registerForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    }, {
      validator: this.customValidator.MustMatch('password', 'confirmPassword')
    }
    );
  }

  ngOnInit(): void {
    this.resetKey = this.Activatedroute.snapshot.queryParams['key'];
    console.log(this.resetKey);
  }
  get registerFormControl() { return this.registerForm.controls }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.errorMessage = "Form is invalid."
      return;
    } else {
      if (this.resetKey) {
        let user: User = {
          key: this.resetKey,
          newPassword: this.registerFormControl.password.value
        };
        this.userService.finishResetPassword(user).subscribe((response: any) => {
          if (response) {
            this.showError = false;
            this.router.navigate(['/login/login'])
          }
        });
      }else{
        this.errorMessage = "Key is empty."
      }
    }
  }
}
