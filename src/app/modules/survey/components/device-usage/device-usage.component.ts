import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-usage',
  templateUrl: './device-usage.component.html',
  styleUrls: ['./device-usage.component.css']
})
export class DeviceUsageComponent implements OnInit {

  deviceId : any;
  deviceState: any;
  constructor(private Activatedroute:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }
  continueNavigate(){
    this.router.navigateByUrl('survey/deviceGeneres/'+this.deviceState+'/'+this.deviceId);
  }


}
