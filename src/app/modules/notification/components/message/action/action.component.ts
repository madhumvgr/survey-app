import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private notifService: NotificationService, private router: Router, private sharedService: SharedService, private zone: NgZone) {
    
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

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
