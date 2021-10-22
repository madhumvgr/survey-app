import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../modules/notification/service/notification.service';
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
  constructor(private zone: NgZone, private notifService: NotificationService, private sharedService: SharedService, private router: Router) {

  }

  ngOnInit(): void {
    this.notifService.getMessageList();
    this.subscription.add(this.sharedService.getMessagesObservable().subscribe(data => {
      this.zone.run(() => {
        console.log(data);
        this.messages = data;
      })
    }));
  }
  openNotification() {
    this.notify = true;
    this.router.navigateByUrl('/messages');

  }
}
