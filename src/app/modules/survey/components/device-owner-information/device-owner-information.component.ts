import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  ownerSelect: any = "";
  error: boolean = false;
  selectedOwner: any = {};
  deviceOwnerInfoForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, private Activatedroute: ActivatedRoute,
    private router: Router, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceOwnerInfoForm = this.fb.group({
      selectedOwner: [''],
    });
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        this.ownerList = response;
        // get owner information of a particular device. 
        this.deviceService.getCustomRequest(DeviceConstants.deviceOwnerByDeviceId + this.deviceId).subscribe(response => {
          if (response) {
              this.selectedOwner = response;
              this.deviceOwnerInfoForm.get('selectedOwner')?.setValue(this.selectedOwner['memberNo']); 
          }
        });
      }
    });
  }

  // convenience getter for easy access to form fields
  get deviceInfoFormControl() { return this.deviceOwnerInfoForm.controls; }

  continueNavigate() {
    let selectedOwner = this.deviceInfoFormControl["selectedOwner"];
    if (selectedOwner.value == '') {
      this.error = true;
    }
    console.log(selectedOwner.value);
    let selectedOwn: any;
    selectedOwn = this.ownerList.filter(owner => owner.memberNo === selectedOwner.value)[0];
    // post call to save device member information.
    let device = {
      "deviceId": this.deviceId,
      "homeNo": selectedOwn["homeNo"],
      "memberNo": selectedOwn["memberNo"]
    }

    this.deviceService.updateDeviceMember(device).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('survey/multiUserList/' + this.deviceState + '/' + this.deviceId);
    });

  }

}
