import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';

export interface Member {
  deviceId: string;
  homeNo: string;
  memberName: string;
  memberNo: string;
  memberSurveyStatus: string;
  memberSurveyStatusId: number;
  usePercentage: number;
}

@Component({
  selector: 'app-multi-user-list',
  templateUrl: './multi-user-list.component.html',
  styleUrls: ['./multi-user-list.component.css']
})
export class MultiUserListComponent implements OnInit {

  deviceId: any;
  deviceState: any;
  multiUserListForm: FormGroup = this.fb.group({});
  items: FormArray | undefined;
  controls: AbstractControl[] = [];
  showPercentageError: boolean = false;
  constructor(private fb: FormBuilder, private Activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.multiUserListForm = this.fb.group({
      arr: this.fb.array([])
    })
    this.controls = (this.multiUserListForm.get('arr') as FormArray).controls;

    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        response.forEach((mem: any) => {
          this.addMemberPercentage(mem);
        });
      }
    });
  }

  addMemberPercentage(member: Member) {
    this.items = this.multiUserListForm.get('arr') as FormArray;
    this.items.push(this.fb.group({
      usePercentage: member.usePercentage,
      memberName: member.memberName
    }))
  }

  saveAndExit(){
    if(this.isPercentageMoreThanHundered()){
      this.showPercentageError = true;
    }else{
      console.log(this.controls);
      this.deviceService.updateDeviceMemberWithPercentage(this.controls.values).subscribe(
        res => {
          this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
        }
      );
      this.showPercentageError = false;
    }
  }
  continueNavigate() {
    if(this.isPercentageMoreThanHundered()){
      this.showPercentageError = true;
    }else{
      this.showPercentageError = false;
      this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
    }
  }

  isPercentageMoreThanHundered(){
    let sumPercentage=0;
    this.controls.forEach(
      control => {
        sumPercentage = sumPercentage + parseInt(control.value["usePercentage"]);
      })
     return sumPercentage > 100? true: false;
  }

}
