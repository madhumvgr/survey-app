import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../modules/notification/service/notification.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  notify = false;
  count :any;
  constructor(private notifService: NotificationService, private router: Router) {
    this.notifService.getUnReadMessageCount().subscribe(res => {
      this.count = res;
    })
  }

  ngOnInit(): void {
  }
  openNotification() {
    this.notify = true;
    this.router.navigateByUrl('/messages');
    
  }
}
