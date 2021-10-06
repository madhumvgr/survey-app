import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationsService } from 'src/app/shared/services/push-notification.service';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.css']
})
export class MessageCenterComponent implements OnInit {

  model: any = {};
  password: any;
  title: string = 'Browser Push Notifications!';

  constructor(private router: Router, private _notificationService: PushNotificationsService) {
    this._notificationService.requestPermission();
  }

  ngOnInit(): void {
  }

  navToRegister() {
    this.router.navigate(['login/register']);
  }

  onSubmit() {
    this.navToRegister();

  }

  notify() {
    let data: Array<any> = [];
    data.push({
      'title': 'Approval',
      'alertContent': 'This is First Alert -- By Debasis Saha'
    });
    data.push({
      'title': 'Request',
      'alertContent': 'This is Second Alert -- By Debasis Saha'
    });
    data.push({
      'title': 'Leave Application',
      'alertContent': 'This is Third Alert -- By Debasis Saha'
    });
    data.push({
      'title': 'Approval',
      'alertContent': 'This is Fourth Alert -- By Debasis Saha'
    });
    data.push({
      'title': 'To Do Task',
      'alertContent': 'This is Fifth Alert -- By Debasis Saha'
    });

    this._notificationService.generateNotification(data);
  }
}
