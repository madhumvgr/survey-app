import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DeviceService } from '../modules/login/services/device.service';
import { NotificationService } from '../modules/notification/service/notification.service';
import { DeviceConstants } from '../shared/models/url-constants';
import { AuthService } from '../shared/services/auth.service';
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
  constructor(private authService:AuthService,
    private zone: NgZone, 
    private notifService: NotificationService, 
    private sharedService: SharedService, 
    private router: Router,
    private deviceService: DeviceService, private translate: TranslateService) {

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
        this.firstName = response['firstName'];
        this.lastName = response['lastName'];
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

}
