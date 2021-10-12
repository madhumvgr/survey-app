import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.css']
})
export class DeviceInformationComponent implements OnInit {
  deviceType : any;
  deviceState: any;
  constructor(private Activatedroute:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.deviceType = this.Activatedroute.snapshot.params['type'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }
  continueNavigate(){
    this.router.navigateByUrl('survey/deviceOwnerInformation/'+this.deviceState+'/'+this.deviceType);
  }

}
