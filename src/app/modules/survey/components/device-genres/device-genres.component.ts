import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
import { BaseComponent } from 'src/app/shared/util/base.util';

@Component({
  selector: 'app-device-genres',
  templateUrl: './device-genres.component.html',
  styleUrls: ['./device-genres.component.css']
})
export class DeviceGenresComponent extends BaseComponent implements OnInit {
  deviceId: any;
  deviceState: any;
  homeNo: any;
  deviceGenereForm: FormGroup = this.fb.group({});
  controls: AbstractControl[] = [];
  generes: DeviceGenere[] = [];
  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService, public matDialog: MatDialog) {
    super(matDialog);
  }

  ngOnInit(): void {
    this.deviceId = this.activatedroute.snapshot.params['deviceId'];
    this.homeNo = this.activatedroute.snapshot.params['homeNo'];
    this.deviceGenereForm = this.fb.group({
      arr: this.fb.array([])
    })
    this.controls = (this.deviceGenereForm.get('arr') as FormArray).controls;

    // this.deviceService.getCustomRequest(DeviceConstants.deviceGenersGetUrl + this.homeNo+'/'+this.deviceId).subscribe(response => {
    this.deviceService.getCustomRequest(DeviceConstants.deviceGenersGetUrl + '100' + '/' + '100').subscribe(response => {
      if (response) {
        this.generes = response;
      }
    });
  }


}
export interface DeviceGenere {
  genreName?: String;
  id?: String;
  listGenresTimeline?: TimeLine[];
}
export interface TimeLine {
  dayOfWeek: String;
  id: String;
  usageTimelineId: String;
}

// genreId : genreId value would be from get api.
// dayOfWeek : 1 = Weekday 2 = Weekend
//usageTimelineId: timings. 

// "deviceId": "100",
// "memberNo": "100",
// "genreId":1,
// "dayOfWeek":"2",
// "usageTimelineId":"1",
// "addNew":true