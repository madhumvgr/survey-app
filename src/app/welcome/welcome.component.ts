import { HttpHeaders } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DeviceService } from '../modules/login/services/device.service';
import { NotificationService } from '../modules/notification/service/notification.service';
import { DeviceConstants, UrlConstants } from '../shared/models/url-constants';
import { AuthService } from '../shared/services/auth.service';
import { AutoLogoutService } from '../shared/services/auto-logout.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  notify = false;
  messages: any;
  subscription: any = new Subscription();
  firstName: string ="";
  lastName: string ="";
  homeID: any;
  isAdmin: any;
  fileToUpload!: File;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  form = new FormGroup({
    homeID : new FormControl()
  });

  constructor(private authService:AuthService,
    private zone: NgZone, 
    private notifService: NotificationService, 
    private sharedService: SharedService, 
    private router: Router,
    private deviceService: DeviceService, private translate: TranslateService,
    private localStorageService:LocalStorageService,
    private autoLogoutService: AutoLogoutService) {

  }

  ngOnInit(): void {
    this.notifService.getMessageList();
    this.subscription.add(this.sharedService.getMessagesObservable().subscribe((data:any) => {
      this.zone.run(() => {
        console.log(data);
        this.messages = data;
      })
    }));
    this.deviceService.getCustomRequest(DeviceConstants.deviceDetails).subscribe(response => {
      if (response) {
        console.log(response);
        this.localStorageService.setUserFullName(response.firstName);
        this.firstName = response['firstName'];
        this.lastName = response['lastName'];
        this.isAdmin = response['isAdmin'];
        console.log(this.isAdmin);
      }
    });

    this.authService.isAuthenticatedUser(true);
  }
  openNotification() {
    this.notify = true;
    this.router.navigateByUrl('/notification/messages');

  }
  showWindow(){
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'),'name','width=600,height=400,top=200');
  }

  onSearch(){
    this.deviceService.getCustomRequest(UrlConstants.homeId + this.form.value.homeID).subscribe(response => {
      if(this.form.value.homeID == response.homeNo){
        this.router.navigate(['/admin/' +this.form.value.homeID]);
      }
    }); 
  }

  uploadFile(){
    this.deviceService.uploadFile().subscribe(response => {
      if(response){
        console.log(response);
      }
    })
  }

  handleFileInput(event: any) {
  console.log(event.target.files[0])
  this.fileToUpload = event.target.files[0]
  debugger;
  }

  uploadFileToActivity() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload );
    this.deviceService.postFile(formData).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }



}
