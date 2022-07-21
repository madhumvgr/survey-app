import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { TelevisionService } from 'src/app/modules/login/services/television-service.service';
import { ModalComponent } from 'src/app/modules/shared/components/modal/modal.component';
import { DeviceConstants, TelevisionConstants } from 'src/app/shared/models/url-constants';
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
  list: any
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
    private translate: TranslateService, private televisionService: TelevisionService) {
    super();
    let url = this.activatedroute.snapshot.url[0].path;
    if (url == "tv-selectChannel") {
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
    this.list = this.activatedroute.snapshot.params['list'];
    if (this.deviceState == "Inprogress") {
      this.deviceStatus = "In Progress"
    } else {
      this.deviceStatus = this.deviceState;
    }
    this.memberNo = this.activatedroute.snapshot.params['memberNo'];
    if(!this.isTvGenere){
    this.deviceService.getDeviceInfo(this.deviceId).subscribe(res => { 
      this.userCount = res.numberOfUsers;
      console.log(this.userCount);
    });
  }
    this.timeLinesForm = this.fb.group({
      genere: new FormArray([]),
      dont: new FormControl(false)
    });

    this.addCheckboxes();
    let notSelected = '0';
    if(this.isTvGenere){
      this.deviceService.getCustomRequest(TelevisionConstants.selectTvChannelGetUrl + this.memberNo).
      subscribe(response => {
        const val= this.generes.map( obj => obj.selected);
        response.forEach( (obj:any)=> {
        val[obj.stationId - 1]= true;
        if(obj.notSelected){
          notSelected = '1';
        }
        });
        this.timeLinesForm.get('genere')?.setValue(val);
        this.timeLinesForm.get('dont')?.setValue(notSelected);
      });

    } else{
    this.deviceService.getCustomRequest(DeviceConstants.selectChannelGetUrl + this.memberNo + '/' + this.deviceId).
      subscribe(response => {
        const val= this.generes.map( obj => obj.selected);
        response.forEach( (obj:any)=> {
        val[obj.stationId - 1]= true;
        if(obj.notSelected){
          notSelected = '1';
        }
        });
        this.timeLinesForm.get('genere')?.setValue(val);
        this.timeLinesForm.get('dont')?.setValue(notSelected);
      });
    }

  }

  get genreFormArray() {
    return this.timeLinesForm.controls.genere as FormArray;
  }

  addCheckboxes(){
    this.generes.forEach(() => this.genreFormArray.push(new FormControl(false)));
  }
  

  updateTimeLine(event:any,i:any) {
    this.timeLinesForm.get('dont')?.setValue('0');
    console.log(event?.target?.checked);
    if(this.isTvGenere) {
      let item = {
        memberNo: '',
        genreId: 0,
        addNew: event?.target?.checked,
        notSelected: false
      }
      item['memberNo'] = this.memberNo;
      item['genreId'] = parseInt(this.generes[i].id);
      
      this.deviceService.updateTvSelectChannel(item).
        subscribe((response: any) => {
          console.log("Update record");
        });
  
    }else{
    let item = {
      deviceId: '',
      memberNo: '',
      genreId: 0,
      addNew: event?.target?.checked,
      notSelected: false
    }
    item['deviceId'] = this.deviceId;
    item['memberNo'] = this.memberNo;
    item['genreId'] = parseInt(this.generes[i].id);
    
    this.deviceService.updateSelectChannel(item).
      subscribe((response: any) => {
        console.log("Update record");
      });
    }
  }

  unCheck(){
    if(this.isTvGenere){
      let item = {
        memberNo: '',
        genreId: 0,
        notSelected: true
      }
      item['memberNo'] = this.memberNo;
      
      this.deviceService.updateTvSelectChannel(item).
        subscribe((response: any) => {
          console.log("Update record");
        });
    } else 
    { 
    let item = {
      deviceId: '',
      memberNo: '',
      genreId: 0,
      notSelected: true
    }
    item['deviceId'] = this.deviceId;
    item['memberNo'] = this.memberNo;
    
    this.deviceService.updateSelectChannel(item).
      subscribe((response: any) => {
        console.log("Update record");
      });
    }
    this.timeLinesForm.get('genere')?.setValue(
        this.timeLinesForm.controls['genere'].value.map((value: boolean) => false)
    );
  }
  submit() {
    const selectedOrderIds = this.timeLinesForm.value.genere
      .map((checked:any, i:any) => checked ? this.generes[i].id : null)
      .filter( (v:any) => v !== null);

      if(selectedOrderIds.length ==0 && this.timeLinesForm.get('dont')?.value!=1){
        this.showError =true;
        return;
      }
      if(selectedOrderIds.length== 0){
        let message = 'genres.message';
        let tvMessage = 'televisionChannels.message';
        let deviceMessage = 'genres.device-message';
        if(this.isTvGenere){
          this.televisionService.updateMemberSurvey(this.memberNo).subscribe(
            res => {
              this.televisionService.updateMemberSurvey(this.memberNo).subscribe();
              this.router.navigate(['television/thankyou'], { state: { message: tvMessage, inputRoute: "television" } });
            });
        } else {
          setTimeout(() => {
           
            // Call the setDelay function again with the remaining times
            if(this.userCount != 0) {
              console.log("test");
            this.deviceService.updateMemberSurvey(this.deviceId, this.memberNo).subscribe(
              res => {
                this.deviceService.updateMemberSurvey(this.deviceId, this.memberNo).subscribe();
                this.router.navigate(['survey/device/Thankyou/'+this.deviceState+ '/' +this.deviceId], { state: { message: deviceMessage, inputRoute: "devices"} });
              });
            }else {
               this.deviceService.updateMemberSurvey(this.deviceId, this.memberNo).subscribe(
               res => {
                this.deviceService.updateMemberSurvey(this.deviceId, this.memberNo).subscribe();
               this.deviceService.updateHomeSurvey(this.deviceId).subscribe();
               const message1 = 'deviceInformation.success2';
               this.router.navigate(['survey/Thankyou/deviceList/' +this.deviceState], { state: { message: message1, inputRoute:"submit_device", deviceName: this.deviceName  } });
               });
          }
        }, 20); 
        }
        }else{
        this.deviceService.saveGenreIds(selectedOrderIds);
        if(this.isTvGenere){
          const device = "none";
          this.router.navigate(['television/tv-channels/'  +this.memberNo+ '/'+device], { state: { memberName: this.memberName }} );

        }else{
      //  this.deviceService.saveGenreIds(selectedOrderIds);
        this.router.navigate(['survey/tv-Channels/' + this.deviceState + '/' + this.deviceId + '/' +this.memberNo + '/' +this.userCount+ '/'+this.list], { state: { memberName: this.memberName }} );
       }
       }
  }

  backAction() {
    let url;
    if (this.isTvGenere) {
      if(this.list == "true") {
        this.router.navigate(['/television/tv-selectGeneres/' + this.memberNo+'/' +true], {state: {memberName: this.memberName}});
      } else {
        this.router.navigateByUrl('/television/tv-genres/'+this.memberNo);
      }
      url = "television/household-members";
    } else{
     if(this.list == "true") {
      this.router.navigate(['/survey/selectGeneres/' + this.deviceState + '/' + this.memberNo+ '/' + this.deviceId], {state: {memberName: this.memberName}});
   }else{
      this.router.navigate(['/survey/deviceGeneres/' + this.deviceState + '/' +this.memberNo +'/' + this.deviceId],{ state: { memberName: this.memberName } });
    }
  }
  }
  
  cancelEvent(isBackAction: boolean) {
    console.log(isBackAction);
  }
  public exitEvent(isBackAction: boolean) {
    if (this.isTvGenere) {
      const message = 'deviceInformation.success';
      this.router.navigate(['television/thankyou'], { state: { message: message } });
    } else {
      let message: any;
      if( this.deviceState == "Completed") {
         message ='deviceInformation.success';
      } else{
         message ='deviceInformation.success';
      }      this.router.navigate(['survey/Thankyou'], { state: { message: message } });

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