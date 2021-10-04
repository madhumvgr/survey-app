import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = false;
  loginForm: FormGroup =this.fb.group({});
  submitted = false;
  showInvalidError =false;
  
  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService, 
    private authService: AuthService,
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
      let user: User = {
        email: this.loginFormControl.email.value,
        password:  this.loginFormControl.password.value
      };
      
      if(this.authService.signIn(user)){
        this.showInvalidError= false;
        this.router.navigate(['/welcome']);
      }else{
        this.showInvalidError= true;
      }
    }
  }
}
