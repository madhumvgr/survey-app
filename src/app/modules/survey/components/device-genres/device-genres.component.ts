import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { TelevisionService } from 'src/app/modules/login/services/television-service.service';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { DeviceConstants, TelevisionConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { BaseComponent } from 'src/app/shared/util/base.util';
import { ConfirmationDialogService } from '../select-genres/confirm-dialog.service';

@Component({
  selector: 'app-device-genres',
  templateUrl: './device-genres.component.html',
  styleUrls: ['./device-genres.component.css']
})
export class DeviceGenresComponent extends BaseComponent implements OnInit {
  deviceId: any;
  deviceState: any;
  memberNo: any;
  memberName: any;
  deviceName: any;
  deviceStatus: any;
  userCount: any;
  isTvGenere: boolean = false;
  isValid: boolean = true;
  // timeLinesForm: FormGroup = this.fb.group({});
  timeLinesForm: FormGroup[] = [];
  isNotAutoSave$: Observable<any> = new Observable();
  isNotAutoSave = false;
  submitCall = false;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  ignoreCanDeactivate = false;
  newGenreIds: Array<any> = [];
  generes: Array<any> = [{
    "id": '1',
    "name": "genres.news",
    "isError": false
  },
  {
    "id": '2',
    "name": "genres.sports",
    "isError": false
  },
  {
    "id": '3',
    "name": "genres.entertainment",
    "isError": false
  },
  {
    "id": '4',
    "name": "genres.movies",
    "isError": false
  },
  {
    "id": '5',
    "name": "genres.drama",
    "isError": false
  },
  {
    "id": '6',
    "name": "genres.kidsProgram",
    "isError": false
  },
  {
    "id": '7',
    "name": "genres.comedy",
    "isError": false
  },

  {
    "id": '8',
    "name": "genres.documentaries",
    "isError": false
  },
  {
    "id": '9',
    "name": "genres.hobbies",
    "isError": false
  },
  {
    "id": '10',
    "name": "genres.other",
    "isError": false
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
      "label": "9AM-1PM",
      "addNew": false
    },
    {
      "usageTimelineId": "2",
      "label": "1PM-4PM",
      "addNew": false
    },
    {
      "usageTimelineId": "3",
      "label": "4PM-7PM",
      "addNew": false
    },
    {
      "usageTimelineId": "4",
      "label": "7PM-10PM",
      "addNew": false
    },
    {
      "usageTimelineId": "5",
      "label": "10PM-2AM",
      "addNew": false
    },
    {
      "usageTimelineId": "6",
      "label": "2AM-6AM",
      "addNew": false
    }
  ];
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.submitCall && !this.isNotAutoSave) {
      return true;
    } else if(this.ignoreCanDeactivate) {
      return true;
    }
    else {
      return super.canDeactivate(this.confirmationDialogService, this.isNotAutoSave);
    }
  }
  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService, private localStorageService: LocalStorageService,
    private confirmationDialogService: ConfirmationDialogService,
    private televisionService: TelevisionService, private translate: TranslateService, private el: ElementRef) {
    super();
    let url = this.activatedroute.snapshot.url[0].path;
    const genreIds = this.deviceService.getGenreIds();
    this.newGenreIds = this.generes.filter((e1: any) => {
      return genreIds.some((f: any) => {
        return f === e1.id;
      });
    })
    console.log(this.newGenreIds);

    if (url == "tv-genres") {
      this.isTvGenere = true;
    }
    if (this.isTvGenere) {
      this.memberName = this.localStorageService.getItem(StorageItem.MEMBERNAME);
    } else {
      this.memberName = this.router.getCurrentNavigation()?.extras?.state?.memberName;
      if (!this.memberName) {
        this.memberName = this.localStorageService.getItem(StorageItem.MEMBERNAME);
      }
    }

  }

  ngAfterViewInit() {
    super.afterViewInit(this.modalComponent);
  }

  ngOnInit(): void {
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
    this.deviceId = this.activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.activatedroute.snapshot.params['state'];
    if (this.deviceState == "Inprogress") {
      this.deviceStatus = "In Progress"
    } else if (this.deviceState == "Completed") {
      this.isNotAutoSave$ = this.activatedroute.queryParamMap.pipe(
        map((params: ParamMap) => params.get('isNotAutoSave')),
      );
      this.isNotAutoSave$.subscribe(param => {
        this.isNotAutoSave = param;
        console.log(this.isNotAutoSave);
      });
    } else {
      this.deviceStatus = this.deviceState;
    }
    this.memberNo = this.activatedroute.snapshot.params['memberNo'];
    this.newGenreIds.forEach((genere, i) => {
      this.createForm(genere.id);
      for (let d of this.timeLines) {
        this.addMore(d, parseInt(genere.id));
      }
    });
    if (!this.isTvGenere) {
      this.deviceService.getDeviceInfo(this.deviceId).subscribe(res => {
        this.userCount = res.numberOfUsers;
        console.log(this.userCount);
      });
    }
    if (this.isTvGenere) {
      this.televisionService.getCustomRequest(TelevisionConstants.tvStationByMember + this.memberNo).
        subscribe(response => {
          this.setPreviousValues(response);
        });
    } else {
      this.deviceService.getCustomRequest(DeviceConstants.deviceGenersGetUrl + this.memberNo + '/' + this.deviceId).
        subscribe(response => {
          this.setPreviousValues(response);
        });
    }

  }

  setPreviousValues(genereList: any) {
    const res = genereList.filter((item: any) => this.newGenreIds.some((f) => f.id == parseInt(item.id)));
    res.forEach((element: any) => {
      if (element.listGenresTimeline && (element.id != 11 && element.id != 12)) {
        console.log(element.id);
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

  updateTimeLine(control: any, event?: any, index?: any) {
    let item = control.value;
    item['deviceId'] = this.deviceId;
    item['memberNo'] = this.memberNo;

    if (event && event.target.checked) {
      this.generes[index - 1].isError = false;
    }
    if (event) {
      item['addNew'] = event.target.checked;
    }
    if (this.isTvGenere) {
      this.televisionService.updateDeviceTimeLine(item).
        subscribe((response: any) => {
          console.log("Update record");
        });
    } else {
      if (!this.isNotAutoSave)
        this.deviceService.updateDeviceTimeLine(item).
          subscribe((response: any) => {
            console.log("Update record");
          });
    }
  }

  openConfirmDialog(routeUrl: string, stateObject: Object) {
    this.ignoreCanDeactivate = true;
    let dirtyCount=0;

    this.timeLinesForm.forEach( (form,i) => {
  
      let weekDaysArray = form.get('weekDays') as FormArray;
      let controls = weekDaysArray.controls;
      for (let control of controls) {
        if (control.dirty) {
          dirtyCount++
        }
      }
      if(dirtyCount > 0) {
        this.confirmationDialogService.confirm('Are you sure', 'Do you really want to update the submitted answers.?', 'IAM SURE', 'NO')
      .then((confirmed) => {
        if (confirmed) {
          this.resubmitFormTimeLine(routeUrl, stateObject);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

      } else {
        this.router.navigate(['survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + true], { state: { memberName: this.memberName }, queryParams: { isNotAutoSave: true } });
      }

    });

   }

  resubmitFormTimeLine(routeUrl: any, stateObject: any) {
    this.ignoreCanDeactivate = true;
    let count=0;
    let dirtyCount=0;
    let weekDays= false;

    this.timeLinesForm.forEach( (form,i) => {
  
      let weekDaysArray = form.get('weekDays') as FormArray;
      let controls = weekDaysArray.controls;
      for (let control of controls) {
        if (control.dirty) {
          let item = control.value;
          item['deviceId'] = this.deviceId;
          item['memberNo'] = this.memberNo;
          dirtyCount++;
          if (this.isTvGenere) {
            this.televisionService.updateDeviceTimeLine(item).
              subscribe((response: any) => {
                count++;
                if(count== dirtyCount){
                  weekDays= true;
                  this.updateWeekEndDaysForm(routeUrl,stateObject);
                }
              });
          } else {
            this.deviceService.updateDeviceTimeLine(item).
              subscribe((response: any) => {
                count++;
                if(count== dirtyCount){
                  weekDays= true;
                  this.updateWeekEndDaysForm(routeUrl,stateObject);
                }
              });
          }
        }
      }
    })
    if(dirtyCount == 0)
    {
      this.updateWeekEndDaysForm(routeUrl,stateObject);
    }
  }

  updateWeekEndDaysForm(routeUrl:any,stateObject:any){
    let count=0;
    let dirtyCount=0;
    this.timeLinesForm.forEach( (form,i) => {
      let weekEndArray = form.get('weekEnds') as FormArray;
      let controls = weekEndArray.controls;
      for (let control1 of controls){
        if (control1.dirty) {
          let item1 = control1.value;
          item1['deviceId'] = this.deviceId;
          item1['memberNo'] = this.memberNo;
          dirtyCount++;
          if (this.isTvGenere) {
            this.televisionService.updateDeviceTimeLine(item1).
              subscribe((response: any) => {
                count++;
                if(count== dirtyCount){
                  this.router.navigate([routeUrl],stateObject);
                }
              });
          } else {
            this.deviceService.updateDeviceTimeLine(item1).
              subscribe((response: any) => {
                count++;
                if(count== dirtyCount){
                  this.router.navigate([routeUrl],stateObject);
                }
              });
          }
        }
      }
    })
    if(dirtyCount == 0)
    {
      this.router.navigate([routeUrl],stateObject);
    }
  }
     

  getWeekDayControl(generId: number) {
    return this.timeLinesForm[generId].get('weekDays') as FormArray;
  }

  getWeekEndControl(generId: number) {
    return this.timeLinesForm[generId].get('weekEnds') as FormArray;
  }

  addMore(d: DeviceTimeSlot, genereId: number) {
    console.log(genereId);
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
    // TODO: change device name to Smart TV. 
    let deviceId = this.deviceId ? this.deviceId : 'none';
    this.isValid = true;
    let errorCount = 1;

    this.timeLinesForm.forEach((form, index) => {
      let hasWeekDay = form.value.weekDays.some((weekDay: any) => weekDay['addNew'] === true);
      let hasWeekEnd = form.value.weekEnds.some((weekDay: any) => weekDay['addNew'] === true);

      if (!hasWeekDay && !hasWeekEnd) {
        this.generes[index - 1].isError = true;
        errorCount++;
      }

    });
    let timeLineError = false;
    this.generes.forEach(gen => {
      if (gen.isError) {
        timeLineError = gen.isError;
      }
    });
    if (errorCount === this.timeLinesForm.length || timeLineError) {
      this.isValid = false;
      const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
        ".errorClass"
      );

      firstInvalidControl.scrollIntoView(); //without smooth behavior
    }
    if (this.isValid) {
      if (this.isTvGenere) {
        this.router.navigateByUrl('television/tv-selectChannel/' + this.memberNo);
      }
      else {
        if (this.deviceState == "Completed") {
          this.openConfirmDialog('survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + true, { state: { memberName: this.memberName }, queryParams: { isNotAutoSave: true } });
          //this.router.navigate(['survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + true], { state: { memberName: this.memberName }, queryParams: { isNotAutoSave: true } });
        } else {
          this.router.navigate(['survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + false], { state: { memberName: this.memberName } });
          // this.router.navigateByUrl('survey/tv-Channels/' + this.deviceState + '/' + this.deviceId + '/' +this.memberNo + '/' +this.userCount);
        }
      }
    }
  }

  resubmitForm() {
    const message = 'deviceInformation.resubmit';
    this.openConfirmDialog('survey/Thankyou', { state: { message: message }});
    //this.resubmitFormTimeLine('survey/Thankyou', { state: { message: message } });
    // this.router.navigate(['survey/Thankyou'], { state: { message: message } });
  }

  backAction() {
    let url;
    if (this.isTvGenere) {
      this.router.navigateByUrl('/television/tv-selectGeneres/' + this.memberNo);
    } else if (this.deviceState != "Completed") {
      this.router.navigate(['/survey/selectGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId], { state: { memberName: this.memberName } });
    } else {
      this.router.navigate(['/survey/selectGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId], { state: { memberName: this.memberName }, queryParams: { isNotAutoSave: true } });
    }

  }
  copyValues(target: number, sourceNode: any) {
    let selectedWeekEndIds: string[] = [];
    let selectedWeekDayIds: string[] = [];
    if (target + 1 !== parseInt(sourceNode.target.value)) {
      let weekDayControls = this.getWeekDayControl(parseInt(sourceNode.target.value)).controls;
      let weekEndControl = this.getWeekEndControl(parseInt(sourceNode.target.value)).controls;
      weekDayControls.forEach(weekDay => {
        if (weekDay.value['addNew']) {
          selectedWeekDayIds.push(weekDay.value['usageTimelineId']);
        }
      });

      weekEndControl.forEach(weekEnd => {
        if (weekEnd.value['addNew']) {
          selectedWeekEndIds.push(weekEnd.value['usageTimelineId']);
        }
      });

      // deselect all elements in target accodion and set the new values. 
      let targetWeekDayControls = this.getWeekDayControl(target + 1).controls;
      let targetWeekEndControl = this.getWeekEndControl(target + 1).controls;
      targetWeekDayControls.forEach(weekDay => {
        weekDay.patchValue({ "addNew": false });
        if (selectedWeekDayIds.indexOf(weekDay.value.usageTimelineId) > -1) {
          weekDay.patchValue({ "addNew": true });
        }
        this.updateTimeLine(weekDay);
      });
      targetWeekEndControl.forEach(weekEnd => {
        weekEnd.patchValue({ "addNew": false });
        if (selectedWeekEndIds.indexOf(weekEnd.value.usageTimelineId) > -1) {
          weekEnd.patchValue({ "addNew": true });
          this.updateTimeLine(weekEnd);
        }
        this.updateTimeLine(weekEnd);
      });
    }
  }
  // backAction(){
  //   this.modalConfig={
  //     "isBackAction": true,
  //     "modalTitle": "Hello",
  //     "content": "Your work is saved! You can always finish the rest of it later.",
  //     "dismissButtonLabel": "Cancel",
  //     "closeButtonLabel": "Exit",
  //   }
  //   this.openModal();
  // }
  cancelEvent(isBackAction: boolean) {
    console.log(isBackAction);
  }
  exitEvent(isBackAction: boolean) {
    if (this.isTvGenere) {
      const message = this.translate.instant('deviceInformation.success');
      this.router.navigate(['television/thankyou'], { state: { message: message } });
    } else {
      let message: any;
      if (this.deviceState == "Completed") {
        message = this.translate.instant('deviceInformation.success2');
      } else {
        message = this.translate.instant('deviceInformation.success');
      }
      this.router.navigate(['survey/Thankyou/deviceList/' + this.deviceState], { state: { message: message, inputRoute: "deviceList" } });


    }
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