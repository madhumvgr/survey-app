import { HttpHeaders } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { NotificationService } from 'src/app/modules/notification/service/notification.service';
import { DeviceConstants, UrlConstants } from 'src/app/shared/models/url-constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AutoLogoutService } from 'src/app/shared/services/auto-logout.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {

  notify = false;
  messages: any;
  subscription: any = new Subscription();
  firstName: any;
  lastName:any;
  errorMessage: any;
  uploadStatus = false;

  name:any;
  homeID: any;
  isAdmin: any;
  fileToUpload!: File;
  fileName: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  searchError = false;
  successMsg : any;

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

      this.isAdmin = this.localStorageService.getItem(StorageItem.ADMIN);
      this.name = this.localStorageService.getItem(StorageItem.ADMINNAME);
  }

  ngOnInit(): void {
    this.notifService.getMessageList();
  //  this.isAdmin = this.localStorageService.getItem(StorageItem.ADMIN);
    this.deviceService.getCustomRequest(DeviceConstants.deviceDetails).subscribe(response => {
      if (response) {
        console.log(response);
        this.localStorageService.setUserFullName(response.firstName);
        this.firstName = response['firstName'];
        this.lastName = response['lastName'];
        this.isAdmin = response['isAdmin'];
        this.localStorageService.setPanellistType(response.panelistType);
        console.log(this.isAdmin);
      }
    });

    this.authService.isAuthenticatedUser(true);
  }
  
  showWindow(){
    window.open(this.translate.instant('welcomePage.privacyPolicyUrl'),'name','width=600,height=400,top=200');
  }

  onSearch(){
    this.deviceService.getCustomRequest(UrlConstants.homeId + this.form.value.homeID).subscribe(response => {
    
      if(this.form.value.homeID == response.homeNo){
        this.searchError = false;
        this.localStorageService.setHomeId(this.form.value.homeID);
        this.router.navigate(['/admin/' +this.form.value.homeID]);
      }
    }, error => {
        this.searchError = true;
    }); 
  }

  // uploadFile(){
  //   this.deviceService.uploadFile().subscribe(response => {
  //     if(response){
  //       console.log(response);
  //     }
  //   })
  // }

  handleFileInput(event: any) {
  console.log(event.target.files[0].type)
  this.fileToUpload = event.target.files[0]
  this.fileName = event.target.files[0].name;
  debugger;
  }

  uploadFileToActivity() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload );
    if(this.fileToUpload.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    this.deviceService.postFile(formData).subscribe(data => {

      
    this.successMsg = "admin.uploadMsg";
    this.uploadStatus = false;

      // do something, if upload success
      }, error => {
        this.uploadStatus = true;
        this.errorMessage = error.error.detail;
        console.log(error);
      });
    } else {
      this.successMsg = undefined;
      this.uploadStatus = true;
      this.errorMessage =  "admin.error2";
    }
  }



}
