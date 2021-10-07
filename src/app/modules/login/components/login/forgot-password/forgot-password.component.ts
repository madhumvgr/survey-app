import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword, User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  hide = false;
  loginForm: FormGroup =this.fb.group({});
  submitted = false;
  showInvalidError =false;
  
  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService, 
    private router: Router) { }

  ngOnInit(): void {
    this.hide = false;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
     }
    );
  }
  
  navigateTo() {
  this.hide = true;
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.table(this.loginForm.value);
      let forgotPassword: ForgotPassword = {
        email: this.loginFormControl.email.value
      };
      
      // if(this.authService.signIn(forgotPassword)){
      //   this.showInvalidError= false;
      //   this.router.navigate(['/welcome']);
      // }else{
      //   this.showInvalidError= true;
      // }
    }
  }

}
