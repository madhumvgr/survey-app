import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  messages: any;
  subscription: any = new Subscription();
  displayAction : any;
  actionType: any;
  action_type:any;
  privacyMessage:any;

  constructor(private notifService: NotificationService,
     private activatedroute: ActivatedRoute, private sharedService: SharedService, private zone: NgZone,
     private router: Router, private translate: TranslateService) {
    this.actionType = this.activatedroute.snapshot.params['actionType'];
    this.privacyMessage = this.router.getCurrentNavigation()?.extras?.state?.message;

    this.action_type = this.actionType.replace(/\s/g, "");
  }

  ngOnInit(): void {
    this.subscription.add(this.sharedService.getMessagesObservable().subscribe(data => {
      this.zone.run(() => {
      this.messages = data;
      })
    }));
    const obj: any = this.notifService.displaymessage();
    if(obj?.id) {
      this.displayAction = obj
    }else if(this.actionType=='PrivacyPolicyUpdate') {
      this.displayAction = this.privacyMessage;
    }
  }

  takeAction(){
    if(this.actionType=='NewDevice' && this.displayAction.deviceId !="null"){
      this.router.navigateByUrl('/survey/deviceInformation/New/'+this.displayAction.deviceId);
    }else if(this.actionType=='Re-doSurvey'){
      this.router.navigateByUrl('/survey/deviceList/Inprogress');
    }else if(this.actionType=='PrivacyPolicyUpdate'){
      this.notifService.markMessageRead(this.privacyMessage).subscribe(res => {
        window.open(this.translate.instant('welcomePage.privacyPolicyUrl'),'name','width=600,height=400,top=200');
      })  
    }
  }
  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  
  showWindow(){
     }

}
