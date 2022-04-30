import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { DeviceService } from '../../services/device.service';
import { BaseComponent } from 'src/app/shared/util/base.util';
import { ModalComponent } from 'src/app/modules/shared/components/modal/modal.component';
import { Panels } from "src/app/shared/models/url-constants";





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  extends BaseComponent implements OnInit {

 
  hide = false;
  show = false;
  loginForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  showError = false;
  signin: any;  
  isIE = false;
  panelistType: any;
  
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  
  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router, private deviceService: DeviceService) {super() }

    

  ngOnInit(): void {
    // @ts-ignore
    this.isIE = /*@cc_on!@*/false || !!document['documentMode'];
    this.show= true;
    this.hide = false;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    }
    );
  }

  ngAfterViewInit(){
    super.afterViewInit(this.modalComponent);
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

          this.deviceService.getExistingHomes().subscribe(existingHomes => { 
            if (existingHomes && existingHomes.panels) {
              const panelIds = existingHomes.panels.map((obj: any) => obj.id);
              const vamArray = panelIds.filter((value:any) => Panels.vamPanelIds.includes(value));
              const isVAM = vamArray.length ? true : false;
              let panel: any;
              if(isVAM){
                   panel ="VAM";
                   this.localStorageService.setPanellistType(panel);
                   this.router.navigate(['/welcome']);
              } else {
                const sspArray = panelIds.filter((value:any) => Panels.sspPanelIds.includes(value));
                const isSSP = sspArray.length ? true : false;
                if(isSSP) {
                   panel ="SSP";
                   this.localStorageService.setPanellistType(panel);
                   this.router.navigate(['/welcome']);
                } else {
                    //this.openModal();
                    this.router.navigate(['/maintenance']);
                }
              }
            } else {
              //this.openModal();
              this.router.navigate(['/maintenance']);
            }
            }, err =>  this.router.navigate(['/maintenance']));

         
        }
      }, err => this.showError = true,
        () => this.showError = true);

    }
  }
}
function passwordInput() {
  throw new Error('Function not implemented.');
}

