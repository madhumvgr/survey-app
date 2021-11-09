import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';

@Component({
  selector: 'app-device-usage',
  templateUrl: './device-usage.component.html',
  styleUrls: ['./device-usage.component.css']
})
export class DeviceUsageComponent implements OnInit {

  deviceId : any;
  deviceState: any;
  memberList: any;
  button = 'Edit';
  constructor(private Activatedroute:ActivatedRoute,private router: Router,private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        this.memberList = response;
      }
    });
  }
  continueNavigate(memberNo:any){ 
    this.router.navigateByUrl('survey/deviceGeneres/'+memberNo+'/'+this.deviceId);
  }

  submit() {
    
  }


}
