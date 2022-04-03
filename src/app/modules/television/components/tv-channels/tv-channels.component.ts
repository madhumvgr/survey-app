import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { TelevisionService } from 'src/app/modules/login/services/television-service.service';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { DeviceConstants, TelevisionConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { BaseComponent } from 'src/app/shared/util/base.util';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  }
}
@Component({
  selector: 'app-tv-channels',
  templateUrl: './tv-channels.component.html',
  styleUrls: ['./tv-channels.component.css']
})
export class TvChannelsComponent extends BaseComponent implements OnInit {
  stationForm: FormGroup[] = []
  memberNo: any;
  memberName: any;
  isTvGenere: boolean = false;
  deviceName: any;
  deviceId: any;
  deviceState: any;
  userCount: any;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  stations: Array<any> = [{
    "id": '1',
    "name": "CTV"
  },
  {
    "id": '2',
    "name": "CityTV"
  },
  {
    "id": '3',
    "name": "CBC"
  },
  {
    "id": '4',
    "name": "Global"
  },
  {
    "id": '5',
    "name": "TVA"
  },
  {
    "id": '6',
    "name": "V"
  },
  {
    "id": '7',
    "name": "SRC"
  }
  ]
  timeLines: Array<any> = [
    {
      "id": "1",
      "label": "Select answer"
    },
    {
      "id": "2",
      "label": "I don't watch this channel"
    },
    {
      "id": "3",
      "label": "Upto 30 minutes"
    },
    {
      "id": "4",
      "label": "More than 30 minutes up to 1 hr"
    },
    {
      "id": "5",
      "label": "More than 1 hour up to 2 hours"
    },
    {
      "id": "6",
      "label": "More than 2 hours up to 3 hours"
    }

  ]
  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService,
    private televisionService: TelevisionService,
    private localStorageService: LocalStorageService, private translate: TranslateService) {
    super();
    let url = this.activatedroute.snapshot.url[0].path;
    if (url == "tv-channels") {
      this.isTvGenere = true;
    }
  }

  ngAfterViewInit(){
    super.afterViewInit(this.modalComponent);
  }


  ngOnInit(): void {
    this.memberNo = this.activatedroute.snapshot.params['memberNo'];
    this.memberName = this.localStorageService.getItem(StorageItem.MEMBERNAME);
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
    this.deviceId = this.activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.activatedroute.snapshot.params['state'];
    this.userCount = this.activatedroute.snapshot.params['userCount'];

    this.stations.forEach((station, i) => {
      this.createForm(station.id);
    });
    if (this.deviceId !== "none") {
      this.televisionService.getCustomRequest(TelevisionConstants.getStationsWithDeviceId + this.memberNo + '/' + this.deviceId).
        subscribe(response => {
          this.setPreviousValues(response);
        });
    } else {
      this.televisionService.getCustomRequest(TelevisionConstants.getStations + this.memberNo).
        subscribe(response => {
          this.setPreviousValues(response);
        });
    }

  }

  createForm(genereId: number) {
    this.stationForm[genereId] = this.fb.group({
      weekDays: new FormControl(null, [createPasswordStrengthValidator()]),
      weekEnds: new FormControl(null, [createPasswordStrengthValidator()]),
    });
  }

  setPreviousValues(genereList: any) {
    genereList.forEach((element: any) => {
      if (element.portalTvStationUsageDTO) {
        this.stationForm[element.stationId]?.patchValue({
          weekDays: element.portalTvStationUsageDTO.avgWeekdayUsa ? '' + element.portalTvStationUsageDTO.avgWeekdayUsa : '1',
          weekEnds: element.portalTvStationUsageDTO.avgWeekendUsa ? '' + element.portalTvStationUsageDTO.avgWeekendUsa : '1'
        });
      }
    });
  }

  submit() {

    if(this.isFormValid()){
      let message = this.translate.instant('genres.message');
      if (this.stationForm.filter(e => !e.valid).length === 0 || this.isTvGenere) {
  
        this.televisionService.updateMemberSurvey(this.memberNo).subscribe(
          res => {
            this.router.navigateByUrl('');
            this.router.navigate(['television/thankyou'], { state: { message: message } });
          });
  
      } else {
        this.deviceService.updateMemberSurvey(this.deviceId, this.memberNo).subscribe(
          res => {
            if(this.userCount != 0) {
              this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
           }else {
            this.deviceService.updateHomeSurvey(this.deviceId).subscribe();
            this.router.navigate(['survey/Thankyou/' + this.deviceName], { state: { message: message } });;
            }
          });
      }
    }
  }

  isFormValid(){
    let isValid = true;
    this.stationForm.forEach( form => {
      if(!form.value.weekDays || form.value.weekDays==''|| form.value.weekDays=='1'){
        const formControl = <FormControl>form.get('weekDays');
        formControl.setErrors({'required':true});
          isValid= false;
      } if(!form.value.weekEnds || form.value.weekEnds==''|| form.value.weekEnds=='1'){
          const formControl = <FormControl>form.get('weekEnds');
          formControl.setErrors({'required':true});
            isValid= false;
        }else{
        form.setErrors(null);
      }
    });
    return isValid;
  }

  updateTimeLine(generId: any) {
    let weekDayStationValue, weekEndstationValue;
    weekDayStationValue = this.stationForm[generId]?.get('weekDays')?.value;
    weekEndstationValue = this.stationForm[generId]?.get('weekEnds')?.value;

    let updateItem: any = {
      "avgWeekdayUsa": weekDayStationValue,
      "avgWeekendUsa": weekEndstationValue,
      "memberNo": this.memberNo,
      "stationId": generId
    }
    if (this.deviceId !== "none") {
      updateItem['deviceNo'] = this.deviceId;
      this.televisionService.updateStationsWithDeviceId(updateItem).
        subscribe((response: any) => {
          console.log("Update record");
        });

    } else {
      this.televisionService.updateTelevisionStation(updateItem).
        subscribe((response: any) => {
          console.log("Update record");
        });

    }

  }

  backRoute() {
    if (this.isTvGenere) {
      this.router.navigateByUrl('/television/tv-genres/' + this.memberNo);
    } else {
      this.router.navigateByUrl('survey/deviceGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId);
    }
  }

  exitEvent(isBackAction: boolean) {
    if (this.isTvGenere) {
      const message = this.translate.instant('genres.message');
      this.router.navigate(['television/thankyou'], { state: { message: message } });
    } else {
      const message = this.translate.instant('deviceInformation.success') + this.deviceName + this.translate.instant('deviceInformation.success2');
      this.router.navigate(['survey/Thankyou/' + this.deviceName], { state: { message: message } });

    }
  }

   cancelEvent(isBackAction: boolean) {
    console.log(isBackAction);
  }

  // let item = control.value;
  // item['memberNo'] = this.memberNo;

  //if(this.isTvGenere){

  //}else{
  //   this.deviceService.updateDeviceTimeLine(item).
  //   subscribe((response: any) => {
  //     console.log("Update record");
  //   });
  // }
}

