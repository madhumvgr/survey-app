import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
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
  memberNo:any;
  modalConfig!: ModalConfig;
  // timeLinesForm: FormGroup = this.fb.group({});
  timeLinesForm: FormGroup[] = []
  @ViewChild('modal')
  private modalComponent!: ModalComponent;

  generes: Array<any> = [{
    "id": '1',
    "name": "News & Analysis"
  },
  {
    "id": '2',
    "name": "Sports"
  },
  {
    "id": '3',
    "name": "Entertainment"
  },
  {
    "id": '4',
    "name": "Movies"
  },
  {
    "id": '5',
    "name": "Drama"
  },
  {
    "id": '6',
    "name": "Kids Programming"
  },
  {
    "id": '7',
    "name": "Comedy"
  },
 
  {
    "id": '8',
    "name": "Documentaries"
  },
  {
    "id": '9',
    "name": "Hobbies & Leisure"
  },
  {
    "id": '10',
    "name": "Other"
  },
  {
    "id": '11',
    "name": "None"
  },
  {
    "id": '12',
    "name": "New_Genre"
  }
  ]
  timeLines: Array<DeviceTimeSlot> = [
    {
      "usageTimelineId": "0",
      "label": "6AM-9AM",
      "addNew": false
    },
    {
      "usageTimelineId": "1",
      "label": "9AM-12PM",
      "addNew": false
    },
    {
      "usageTimelineId": "2",
      "label": "12PM-4PM",
      "addNew": false
    },
    {
      "usageTimelineId": "3",
      "label": "4PM-7PM",
      "addNew": false
    },
    {
      "usageTimelineId": "4",
      "label": "7PM-9PM",
      "addNew": false
    },
    {
      "usageTimelineId": "5",
      "label": "9PM-11PM",
      "addNew": false
    },
    {
      "usageTimelineId": "6",
      "label": "11PM-1AM",
      "addNew": false
    },
    {
      "usageTimelineId": "7",
      "label": "1AM-6AM",
      "addNew": false
    },
  ];

  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService, public matDialog: MatDialog) {
    super(matDialog);
  }

  ngOnInit(): void {
    this.deviceId = this.activatedroute.snapshot.params['deviceId'];
    this.memberNo = this.activatedroute.snapshot.params['memberNo'];
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
      this.modalConfig = {
        "modalTitle": "Sample",
      }
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
    // this.deviceService.updateHomeSurvey(DeviceConstants.memberHouseHoldSurveyPostUrl+this.deviceId).subscribe(
    //   res => {console.log(res);
    //   });
      this.deviceService.updateMemberSurvey(this.deviceId,this.memberNo).subscribe(
        res => {console.log(res);
        });

  }

  async openModal() {
    return await this.modalComponent.open()
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