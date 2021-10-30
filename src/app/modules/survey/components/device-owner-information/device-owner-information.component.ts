import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';

export interface Owner {
  memberName: string;
  memberNo: string;
  homeNo: string;
  deviceId: string;
  memberSurveyStatus: string;
  memberSurveyStatusId: string;
  usePercentage: string;

}
@Component({
  selector: 'app-device-owner-information',
  templateUrl: './device-owner-information.component.html',
  styleUrls: ['./device-owner-information.component.css']
})
export class DeviceOwnerInformationComponent implements OnInit {
  deviceId: any;
  deviceState: any;
  ownerList: Owner[] = [];
  ownerSelect: any;
  constructor(private Activatedroute: ActivatedRoute,
    private router: Router, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        this.ownerList = response;
      }
    });

  }
  continueNavigate() {
    this.router.navigateByUrl('survey/multiUserList/' + this.deviceState + '/' + this.deviceId);
  }

}
