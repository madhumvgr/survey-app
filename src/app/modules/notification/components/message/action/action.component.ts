import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private notifService: NotificationService,
     private activatedroute: ActivatedRoute, private sharedService: SharedService, private zone: NgZone,
     private router: Router) {
    this.actionType = this.activatedroute.snapshot.params['actionType'];
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
    }
  }

  takeAction(){
    if(this.actionType=='New Device'){
      this.router.navigateByUrl('/survey/deviceInformation/Inprogress/'+this.displayAction.deviceId);
    }else if(this.actionType=='Re-do Survey'){
      this.router.navigateByUrl('/survey/survey');
    }else if(this.actionType=='Privacy Policy Update'){
      window.open('https\://numeris.ca/privacy-policy/','name','width=600,height=400,top=200');
    }
  }
  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
