import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  hide = false;
  show = false;
  loginForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  showError = false;
  signin: any;
  
  browserVersion = '';
  oldBrowsers = "Chrome 70 Chrome 71";
  public browserStatus = true;

  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

    

  ngOnInit(): void {
    
    this.browserVersion = this.detectBrowserVersion();
    this.show= true;
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
        username: this.loginFormControl.email.value,
        password: this.loginFormControl.password.value,
        rememberMe: false
      };

   //  this.localStorageService.setIdToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaXRpbnBlZG5la2FyMkBnbWFpbC5jb20iLCJhdXRoIjoiIiwiSG9tZU5vIjoiNTUyMTU5MiIsImV4cCI6MTYzNzk0NzYwM30.jFVjCd3GV3pI9JusLEO-cMNM1xcCoZeciMJ1BaHxsMlAmFChKwJJSe6uZN2NxtKq58pBgYP3QZ5zsgN2tnEbHw");
    
      this.userService.signIn(user).subscribe(response => {
        if (response) {
          this.showError = false;
          // After successful sign in, we have to set username into localstorage
          this.localStorageService.setIdToken( response['id_token']);
          this.localStorageService.setUserName(this.loginFormControl.email.value);
          this.router.navigate(['/welcome']);
        }
      }, err => this.showError = true,
        () => this.showError = true);

    }
  }

  detectBrowserVersion(){
    var userAgent = navigator.userAgent, tem, 
    matchTest = userAgent.match(/(opera|Edge|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    
    if(/trident/i.test(matchTest[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return 'IE '+(tem[1] || '');
    }

    if(matchTest[1]=== 'Chrome'){
        tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];

    if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
}

public displayBrowser(){
  if (this.oldBrowsers.search(this.browserVersion) == -1 ) { 
    return false;
  } else { 
    return true;
  }
}

  
}
function passwordInput() {
  throw new Error('Function not implemented.');
}

