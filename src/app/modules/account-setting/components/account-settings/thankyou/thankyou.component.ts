import { Component, Input, OnInit } from '@angular/core';
import { EmailNotificationsComponent } from '../email-notifications/email-notifications.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  newValue: any;
  deviceState: any;
  data: any;
  message: any;
  state:any;
  deviceId:any;
  deviceName: any;

  
  constructor(private Activatedroute: ActivatedRoute, private router: Router) { 
    this.state = this.router.getCurrentNavigation()?.extras?.state;
    this.message = this.router.getCurrentNavigation()?.extras?.state?.message;
    this.deviceName = this.router.getCurrentNavigation()?.extras?.state?.deviceName
  }

  ngOnInit(): void {
    this.newValue = this.Activatedroute.snapshot.params['value'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
  }
submit() {
  this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
}

}
