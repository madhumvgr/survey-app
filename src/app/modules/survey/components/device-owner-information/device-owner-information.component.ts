import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-owner-information',
  templateUrl: './device-owner-information.component.html',
  styleUrls: ['./device-owner-information.component.css']
})
export class DeviceOwnerInformationComponent implements OnInit {
  deviceType : any;
  deviceState: any;
  constructor(private Activatedroute:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.deviceType = this.Activatedroute.snapshot.params['type'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }
  continueNavigate(){
    this.router.navigateByUrl('survey/multiUserList/'+this.deviceState+'/'+this.deviceType);
  }

}
