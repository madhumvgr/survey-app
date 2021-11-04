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
  multiUserCoViewerForm: FormGroup = this.fb.group({});
  members: FormArray | undefined;
  coViewers: FormArray | undefined;
  controls: AbstractControl[] = [];
  coViewerControls: AbstractControl[] = [];
  showPercentageError: boolean = false;
  singleViewerPe: string = "";
  constructor(private fb: FormBuilder, private Activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.multiUserListForm = this.fb.group({
      arr: this.fb.array([])
    })
    this.multiUserCoViewerForm = this.fb.group({
      arr: this.fb.array([])
    })
    this.controls = (this.multiUserListForm.get('arr') as FormArray).controls;
    this.coViewerControls = (this.multiUserCoViewerForm.get('arr') as FormArray).controls;
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        response.forEach((mem: any) => {
          this.addMemberPercentage(mem);
        });
      }
    });

    /* TODO:
    Currently hardcoded 101, where post is not working
    */
    this.deviceService.getCustomRequest(DeviceConstants.deviceCoviewer + '101').subscribe(response => {
      if (response) {
        this.addMemberCoviewerPercentage(response);
      }
    });
  }

  addMemberPercentage(member: Member) {
    this.members = this.multiUserListForm.get('arr') as FormArray;
    this.members.push(this.fb.group({
      usePercentage: member.usePercentage,
      memberName: member.memberName,
      deviceId: member.deviceId,
      homeNo: member.homeNo,
      memberNo: member.memberNo
    }))
  }

  updateMemberDevice(index: any) {
    if (this.members) {
      this.deviceService.updateDeviceMemberWithPercentage(this.controls[index].value).subscribe(
        res => {
           console.log("Updated Member device");
        }
      );
    }
  }

  updateCoviewerDevice(index: any) {
    if (this.members) {
      this.deviceService.updateCoviewerWithPercentage(this.coViewerControls[index].value).subscribe(
          res => {
            console.log("Updated Coviewer device");
          }
        );
    }
  }
  addMemberCoviewerPercentage(member: any) {
    this.coViewers = this.multiUserCoViewerForm.get('arr') as FormArray;
    this.coViewers.push(this.fb.group({
      coViewerPerce: member['coViewerPerce'],
      deviceId: member.deviceId,
      homeNo: member.homeNo,
      singleViewerPe: member.singleViewerPe
    }))
    this.singleViewerPe = member.singleViewerPe;
  }

  saveAndExit() {
    if (this.isPercentageMoreThanHundered()) {
      this.showPercentageError = true;
    } else {
      // let memberObj: any[] = [];
      // this.controls.forEach(control => {
      //   memberObj.push(control.value);
      // });
      // this.deviceService.updateDeviceMemberWithPercentage(memberObj).subscribe(
      //   res => {
      //     this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
      //   }
      // );

      // let coViewerObj = this.coViewerControls[0].value;
      // // prepare coviewer value. 
      // this.deviceService.updateCoviewerWithPercentage(coViewerObj).subscribe(
      //   res => {
      //     this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
      //   }
      // );

      this.showPercentageError = false;
    }
  }
  continueNavigate() {
    if (this.isPercentageMoreThanHundered()) {
      this.showPercentageError = true;
    } else {
      this.showPercentageError = false;
      this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
    }
  }

  isPercentageMoreThanHundered() {
    let sumPercentage = 0;
    this.controls.forEach(
      control => {
        sumPercentage = sumPercentage + parseInt(control.value["usePercentage"]);
      })

    this.coViewerControls.forEach(
      control => {
        sumPercentage = sumPercentage + parseInt(control.value["coViewerPerce"]);
      })
    return sumPercentage > 100;
  }

}
