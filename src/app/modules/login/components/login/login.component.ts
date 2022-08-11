import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../services/user.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { DeviceService } from '../../services/device.service';
import { BaseComponent } from 'src/app/shared/util/base.util';
import { ModalComponent } from 'src/app/modules/shared/components/modal/modal.component';
import { DeviceConstants } from "src/app/shared/models/url-constants";
import { CookieService } from 'ngx-cookie-service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {


  hide = false;
  show = false;
  loginForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  showError = false;
  signin: any;
  isIE = false;
  panelistType: any;
  showCookies = false;
  lang: any;
  showAutologoutMsg = false;

  @ViewChild('modal')
  private modalComponent!: ModalComponent;

  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private userService: UserService,
    private localStorageService: LocalStorageService, private cookieService: CookieService,
    private router: Router, private deviceService: DeviceService, private activatedroute: ActivatedRoute) { super() }



  ngOnInit(): void {
    // @ts-ignore
    this.isIE = /*@cc_on!@*/false || !!document['documentMode'];
    this.show = true;
    this.hide = false;
    this.lang = this.localStorageService.getItem(StorageItem.LANG)
    const cookieValue = this.cookieService.get('hideCookie');
    if(!cookieValue) {
      this.showCookies =true;
    }
    const autoLogout = this.activatedroute.snapshot.queryParams['logout'];
    if(autoLogout == 'autologout'){
      this.showAutologoutMsg = true;
    }
    console.log(this.showCookies);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
    }
    );
  }

  ngAfterViewInit() {
    super.afterViewInit(this.modalComponent);
  }

  setCookie(value: string) {
    this.showCookies = false;
    this.cookieService.set('hideCookie', value);
    this.cookieService.set('LANG', this.lang);
  }

  navigateTo() {
    this.hide = true;
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.showError = false;
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
          this.localStorageService.setIdToken(response['id_token']);
          this.localStorageService.setUserName(this.loginFormControl.email.value);

          //API to get panelist type and storing panelist type in local storage

          this.deviceService.getCustomRequest(DeviceConstants.deviceDetails).subscribe(response => {
            if (response) {
              this.showError = false;
              this.panelistType = response['panelistType'];
            // this.panelistType = 'SSP';
              
              if (this.panelistType == "VAM") {
                this.localStorageService.setPanellistType(this.panelistType);
                this.router.navigate(['/welcome']);

              }
              
              else if (this.panelistType == "SSP") {
                this.localStorageService.setPanellistType(this.panelistType);
                this.router.navigate(['/welcome']);

              } else {
                this.router.navigate(['/maintenance']);
              }
            }
          });




        }
      }, err => this.showError = true);

    } else{
      this.showError = true
    }
  }
}
function passwordInput() {
  throw new Error('Function not implemented.');
}

