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
  memberNo:any;
  // timeLinesForm: FormGroup = this.fb.group({});
  timeLinesForm: FormGroup[] = []
  generes: Array<any> = [{
    "id": '1',
    "name": "News & Analysis"
  },
  {
    "id": '2',
    "name": "Kids Programming"
  },
  {
    "id": '3',
    "name": "Sports"
  },
  {
    "id": '4',
    "name": "Hobbies & Leisure"
  },
  {
    "id": '5',
    "name": "Sports"
  },
  {
    "id": '6',
    "name": "Drama"
  },
  {
    "id": '7',
    "name": "Movies"
  },
  {
    "id": '8',
    "name": "Comedy"
  },
  {
    "id": '9',
    "name": "Entertainment"
  },
  {
    "id": '10',
    "name": "Documentaries"
  },
  {
    "id": '11',
    "name": "Other"
  },
  ]
  timeLines: Array<DeviceTimeSlot> = [
    {
      "usageTimelineId": "1",
      "label": "6AM-9AM",
      "addNew": false
    },
    {
      "usageTimelineId": "2",
      "label": "9AM-1PM",
      "addNew": false
    },
    {
      "usageTimelineId": "3",
      "label": "1PM-4PM",
      "addNew": false
    },
    {
      "usageTimelineId": "4",
      "label": "4PM-7PM",
      "addNew": false
    },
    {
      "usageTimelineId": "5",
      "label": "7PM-10PM",
      "addNew": false
    },
    {
      "usageTimelineId": "6",
      "label": "10PM-2AM",
      "addNew": false
    },
    {
      "usageTimelineId": "7",
      "label": "2AM-6AM",
      "addNew": false
    },
  ];

  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService, public matDialog: MatDialog) {
    super(matDialog);
  }

  ngOnInit(): void {
    this.deviceId = this.activatedroute.snapshot.params['deviceId'];
    this.memberNo = this.activatedroute.snapshot.params['homeNo'];
    this.generes.forEach((genere, i) => {
      this.createForm(genere.id);
      for (let d of this.timeLines) {
        this.addMore(d, i + 1);
      }
    });
    this.deviceService.getCustomRequest(DeviceConstants.deviceGenersGetUrl + this.memberNo + '/' + this.deviceId).
      subscribe(response => {
        this.setPreviousValues(response);
      });
  }

  setPreviousValues(genereList: any) {
    genereList.forEach((element: any) => {
      if (element.listGenresTimeline) {
        element.listGenresTimeline.forEach((timeLine: any) => {
          if (timeLine.dayOfWeek && timeLine.dayOfWeek == 1) {
            let innerControl = this.getWeekDayControl(element.id).controls[parseInt(timeLine.usageTimelineId)];
            innerControl.patchValue({
              addNew: true
            });
          } else if (timeLine.dayOfWeek && timeLine.dayOfWeek == 2) {
            let innerControl = this.getWeekEndControl(element.id).controls[parseInt(timeLine.usageTimelineId)];
            innerControl.patchValue({
              addNew: true
            });
          }
        });
      }
    });
  }

  updateTimeLine(control:any){
    let item= control.value;
    item['deviceId']=this.deviceId;
    item['memberNo']=this.memberNo;
    this.deviceService.updateDeviceTimeLine(item).
    subscribe((response:any) => {
      console.log("Update record");
    });

    console.log(item.value);
  }
  getWeekDayControl(generId: number) {
    return this.timeLinesForm[generId].get('weekDays') as FormArray;
  }

  getWeekEndControl(generId: number) {
    return this.timeLinesForm[generId].get('weekEnds') as FormArray;
  }

  addMore(d: DeviceTimeSlot, genereId: number) {
    this.getWeekDayControl(genereId).push(this.buildTimelines(d, genereId, "1"));
    this.getWeekEndControl(genereId).push(this.buildTimelines(d, genereId, "2"));
  }

  createForm(genereId: number) {
    this.timeLinesForm[genereId] = this.fb.group({
      weekDays: this.fb.array([]),
      weekEnds: this.fb.array([])
    });
  }

  buildTimelines(data: DeviceTimeSlot, genereId: number, dayOfWeek: string) {
    if (!data) {
      data = {
        usageTimelineId: "",
        label: "",
        addNew: false,
        genreId: genereId,
        dayOfWeek: dayOfWeek
      }
    }
    return this.fb.group({
      usageTimelineId: data.usageTimelineId,
      label: data.label,
      addNew: data.addNew,
      genreId: genereId,
      dayOfWeek: dayOfWeek
    });
  }

  submit() {
    console.log(this.timeLinesForm[1].value)
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
export interface DeviceTimeSlot {
  deviceId?: string;
  memberNo?: string;
  genreId?: number;
  dayOfWeek?: string;
  usageTimelineId?: string;
  addNew?: boolean;
  label?: string;
}