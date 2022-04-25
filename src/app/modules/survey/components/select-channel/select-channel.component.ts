import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { ModalComponent } from 'src/app/modules/shared/components/modal/modal.component';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { BaseComponent } from 'src/app/shared/util/base.util';

@Component({
  selector: 'app-select-channel',
  templateUrl: './select-channel.component.html',
  styleUrls: ['./select-channel.component.css']
})
export class SelectChannelComponent extends BaseComponent implements OnInit {
  deviceId: any;
  deviceState: any;
  memberNo: any;
  memberName: any;
  deviceName: any;
  deviceStatus: any;
  userCount: any;
  isTvGenere: boolean = false;
  showError:boolean = false;
  isValid: boolean = true;
  timeLinesForm: FormGroup = this.fb.group({});
  @ViewChild('modal')
  private modalComponent!: ModalComponent;

  generes: Array<any> = [{
    "id": '1',
    "name": "CTV",
    "selected": false
  },
  {
    "id": '2',
    "name": "CityTV",
    "selected": false
  },
  {
    "id": '3',
    "name": "CBC",
    "selected": false
  },
  {
    "id": '4',
    "name": "Global",
    "selected": false
  },
  {
    "id": '5',
    "name": "TVA",
    "selected": false
  },
  {
    "id": '6',
    "name": "V",
    "selected": false
  },
  {
    "id": '7',
    "name": "SRC",
    "selected": false
  }
  ]

  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService, private localStorageService: LocalStorageService,
    private translate: TranslateService) {
    super();
    let url = this.activatedroute.snapshot.url[0].path;
    if (url == "tv-genres") {
      this.isTvGenere = true;
    }
    if (this.isTvGenere) {
      this.memberName = this.localStorageService.getItem(StorageItem.MEMBERNAME);
    } else {
      this.memberName = this.router.getCurrentNavigation()?.extras?.state?.memberName;
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
    } else {
      this.deviceStatus = this.deviceState;
    }
    this.memberNo = this.activatedroute.snapshot.params['memberNo'];
    

    this.timeLinesForm = this.fb.group({
      genere: new FormArray([]),
      dont: new FormControl(false)
    });

    this.addCheckboxes();
    this.deviceService.getCustomRequest(DeviceConstants.selectChannelGetUrl + this.memberNo + '/' + this.deviceId).
      subscribe(response => {
        const val= this.generes.map( obj => obj.selected);
        response.forEach( (obj:any)=> {
        val[obj.stationId - 1]= true;
        });
        this.timeLinesForm.get('genere')?.setValue(val);
      });
  }

  get genreFormArray() {
    return this.timeLinesForm.controls.genere as FormArray;
  }

  addCheckboxes(){
    this.generes.forEach(() => this.genreFormArray.push(new FormControl(false)));
  }
  

  updateTimeLine(event:any,i:any) {
    this.timeLinesForm.get('dont')?.setValue(true);
    console.log(event?.target?.checked);
    let item = {
      deviceId: '',
      memberNo: '',
      genreId: 0,
      addNew: event?.target?.checked
    }
    item['deviceId'] = this.deviceId;
    item['memberNo'] = this.memberNo;
    item['genreId'] = parseInt(this.generes[i].id);
    this.deviceService.updateSelectChannel(item).
      subscribe((response: any) => {
        console.log("Update record");
      });

  }

  unCheck(){
    this.timeLinesForm.get('genere')?.setValue(
        this.timeLinesForm.controls['genere'].value.map((value: boolean) => false)
    );
  }
  submit() {
    const selectedOrderIds = this.timeLinesForm.value.genere
      .map((checked:any, i:any) => checked ? this.generes[i].id : null)
      .filter( (v:any) => v !== null);

      if(selectedOrderIds.length ==0 && !this.timeLinesForm.get('dont')?.value){
        this.showError =true;
        return;
      }
      if(selectedOrderIds.length== 0){
        const message ="from tv channels";
        this.deviceService.updateHomeSurvey(this.deviceId).subscribe();
            this.router.navigate(['survey/Thankyou/' + this.deviceName], { state: { message: message } });;
      }else{
        this.deviceService.saveGenreIds(selectedOrderIds);
        this.router.navigateByUrl('survey/tv-Channels/' + this.deviceState + '/' + this.deviceId + '/' +this.memberNo + '/' +this.userCount);
      }
  }

  backAction() {
    let url;
    if (this.isTvGenere) {
      url = "television/household-members";
    } else if (this.userCount == 0) {
      url = "survey/deviceOwnerInformation/" + this.deviceState + '/' + this.deviceId;
    }
    else {
      url = "/survey/deviceUsage/" + this.deviceState + "/" + this.deviceId;
    }
    this.router.navigateByUrl(url);
  }
  
  cancelEvent(isBackAction: boolean) {
    console.log(isBackAction);
  }
  public exitEvent(isBackAction: boolean) {
    if (this.isTvGenere) {
      const message = this.translate.instant('genres.message');
      this.router.navigate(['television/thankyou'], { state: { message: message } });
    } else {
      const message = this.translate.instant('deviceInformation.success') + this.deviceName + this.translate.instant('deviceInformation.success2');
      this.router.navigate(['survey/Thankyou/' + this.deviceName], { state: { message: message } });

    }
  }
  radioVal: string = '';
  changeRadio(event: Event, value: string) {
    event.preventDefault();
    if (!this.radioVal || this.radioVal !== value) {
      this.radioVal = value;
    }
  }

  public isRadioSelected(value: any) {
    return (this.radioVal === value);
  }

  get genersFormControl () {
    return this.timeLinesForm.get('genere') as FormArray
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
  genere?: string;
}