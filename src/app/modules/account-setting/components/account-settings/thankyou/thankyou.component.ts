import { Component, Input, OnInit } from '@angular/core';
import { EmailNotificationsComponent } from '../email-notifications/email-notifications.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  newValue: any;
  //deviceState: any;
  data: any;
  
  constructor(private Activatedroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.newValue = this.Activatedroute.snapshot.params['value'];
    //this.deviceState = this.Activatedroute.snapshot.params['state'];
  }

}