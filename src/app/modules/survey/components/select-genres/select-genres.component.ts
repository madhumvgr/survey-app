import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { TelevisionService } from 'src/app/modules/login/services/television-service.service';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { DeviceConstants, TelevisionConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { ComponentCanDeactivate } from 'src/app/shared/services/pending-changes.guard';
import { BaseComponent } from 'src/app/shared/util/base.util';
import { ConfirmationDialogService } from './confirm-dialog.service';

@Component({
  selector: 'app-select-genres',
  templateUrl: './select-genres.component.html',
  styleUrls: ['./select-genres.component.css']
})
export class SelectGenresComponent extends BaseComponent implements OnInit, ComponentCanDeactivate {
  deviceId: any;
  deviceState: any;
  memberNo: any;
  memberName: any;
  deviceName: any;
  deviceStatus: any;
  userCount: any;
  isTvGenere: boolean = false;
  isValid: boolean = true;
  showError:boolean = false;
  timeLinesForm: FormGroup = this.fb.group({});
  submitCall: boolean = false;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  panelListType: any;
  submitted:boolean = false;
  notSet:boolean = false;

  generes: Array<any> = [{
    "id": '1',
    "name": "genres.news",
    "selected": false
  },
  {
    "id": '2',
    "name": "genres.sports",
    "selected": false
  },
  {
    "id": '3',
    "name": "genres.entertainment",
    "selected": false
  },
  {
    "id": '4',
    "name": "genres.movies",
    "selected": false
  },
  {
    "id": '5',
    "name": "genres.drama",
    "selected": false
  },
  {
    "id": '6',
    "name": "genres.kidsProgram",
    "selected": false
  },
  {
    "id": '7',
    "name": "genres.comedy",
    "selected": false
  },

  {
    "id": '8',
    "name": "genres.documentaries",
    "selected": false
  },
  {
    "id": '9',
    "name": "genres.hobbies",
    "selected": false
  },
  {
    "id": '10',
    "name": "genres.other",
    "selected": false
  }
  ]
  isNotAutoSave$: Observable<any> = new Observable();
  isNotAutoSave = false;
  ignoreCanDeactivate = false;

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.submitCall && !this.isNotAutoSave) {
      return true;
    }
    else if(this.ignoreCanDeactivate ){
      return true;
    }
    else {
      if(this.timeLinesForm.dirty){
        return super.canDeactivate(this.confirmationDialogService, this.isNotAutoSave);
      } else {
        return true;
      }
      
    }
  }
  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute, private router: Router,
    private deviceService: DeviceService, private localStorageService: LocalStorageService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    private el: ElementRef) {
    super();
    let url = this.activatedroute.snapshot.url[0].path;
    this.panelListType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
    if (url == "tv-selectGeneres") {
      this.isTvGenere = true;
    }
    if (this.isTvGenere) {
      this.memberName = this.localStorageService.getItem(StorageItem.MEMBERNAME);
    } else {
      this.memberName = this.router.getCurrentNavigation()?.extras?.state?.memberName;
      if(!this.memberName){
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
    } else {
      if (this.deviceState == "Completed") {
        this.isNotAutoSave$ = this.route.queryParamMap.pipe(
          map((params: ParamMap) => params.get('isNotAutoSave')),
        );
        this.isNotAutoSave$.subscribe(param => {
          this.isNotAutoSave = param;
          console.log(this.isNotAutoSave);
        });
      }
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
      dont: new FormControl()
    });

    this.addCheckboxes();
    if (!this.isTvGenere){
      this.deviceService.getCustomRequest(DeviceConstants.selectGenersGetUrl + this.memberNo + '/' + this.deviceId).
      subscribe(response => {
        // currently seting values. 
        var notSelected = '0';
        const val= this.generes.map( obj => obj.selected);
        response.forEach( (obj:any)=> {
        val[obj.genreId-1]= true;
        if(obj.notSelected){
          if(this.panelListType == "SSP") {
            this.submitted = true;
          }
          notSelected = '1';
          this.notSet = true;
        }
        });
        this.timeLinesForm.get('genere')?.setValue(val);
        this.timeLinesForm.get('dont')?.setValue(notSelected);
      });

    } else{
    this.deviceService.getCustomRequest(TelevisionConstants.selectTvGenersGetUrl + this.memberNo).
      subscribe(response => {
        // currently seting values. 
        var notSelected = '0';
        const val= this.generes.map( obj => obj.selected);
        response.forEach( (obj:any)=> {
        val[obj.genreId-1]= true;
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
  
  updateTimeLine(event: any, i: any) {
    this.notSet = false;
    this.submitted = false;
    this.timeLinesForm.get('dont')?.setValue('0');
    if (this.isTvGenere) {
      let item = this.prepareItem(this.generes[i].id, event?.target?.checked, true);
      this.deviceService.updateTvSelectGenres(item).
        subscribe((response: any) => {
          console.log("Update record");
        });
    } else {
      let item = this.prepareItem(this.generes[i].id, event?.target?.checked, false);
      if (!this.isNotAutoSave) {
        this.deviceService.updateSelectGenres(item).
          subscribe((response: any) => {
            console.log("Update record");
          });
      }
    }

  }

  prepareItem(id: any, checked: any, isTvChannel: any) {
    let item = {
      deviceId: '',
      memberNo: '',
      genreId: 0,
      addNew: checked,
      notSelected: false
    }
    if (!isTvChannel)
      item['deviceId'] = this.deviceId;
    item['memberNo'] = this.memberNo;
    item['genreId'] = parseInt(id);
    return item;
  }

  completedBackurl() {

    if (this.userCount == 0) {
      this.router.navigate(['/survey/completed-devices/Completed' + '/' + this.deviceId], { queryParams: { isNotAutoSave: true } });
    }
    else {
      this.router.navigate(['/survey/deviceUsage/Completed' + '/' + this.deviceId], { queryParams: { isNotAutoSave: true } });
    }
  }

  unCheck(){
    this.notSet = true
    if(this.isTvGenere){
      let item = {
        memberNo: '',
        genreId: null,
        addNew: null,
        notSelected:true
      }
      item['memberNo'] = this.memberNo;
      this.deviceService.updateTvSelectGenres(item).
        subscribe((response: any) => {
          console.log("Update record");
        });

    } else{
      let item = {
      deviceId: '',
      memberNo: '',
      genreId: null,
      addNew: null,
      notSelected:true
    }
    item['deviceId'] = this.deviceId;
    item['memberNo'] = this.memberNo;
    this.deviceService.updateSelectGenres(item).
      subscribe((response: any) => {
        console.log("Update record");
      });
     }
    this.timeLinesForm.get('genere')?.setValue(
        this.timeLinesForm.controls['genere'].value.map((value: boolean) => false)
    );
    if (this.panelListType == 'SSP') {
        this.submitted = true;
    }
  }
  submit() {
    this.submitCall = true;
    const selectedOrderIds = this.timeLinesForm.value.genere
      .map((checked: any, i: any) => checked ? this.generes[i].id : null)
      .filter((v: any) => v !== null);
    if (selectedOrderIds.length == 0 && this.timeLinesForm.get('dont')?.value != 1) {
      this.showError = true;
      // scroll to error.
      const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
        ".errorClass"
      );

      firstInvalidControl.scrollIntoView(); //without smooth behavior
      return;
    }
    if (selectedOrderIds.length == 0) {
      if (this.isTvGenere) {
        this.router.navigateByUrl('/television/tv-selectChannel/' + this.memberNo + '/' + true);
      } else if(this.deviceState != "Completed"){
       // this.openConfirmDialog('survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + SVGComponentTransferFunctionElement,{ state: { memberName: this.memberName } });
       this.router.navigate(['survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + true], { state: { memberName: this.memberName } });
      } else{
        if(this.deviceState == "Completed" && this.timeLinesForm.dirty) {
          this.openConfirmDialog('survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + true, { state: { memberName: this.memberName }, queryParams: {isNotAutoSave: true}});
        } else{
         const message = this.translate.instant('deviceInformation.success');
          this.router.navigate(['survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + true], { state: { memberName: this.memberName }, queryParams: {isNotAutoSave: true} });
        }
    }
    } else {
      this.deviceService.saveGenreIds(selectedOrderIds);
      if (this.isTvGenere) {
        this.router.navigateByUrl('/television/tv-genres/' + this.memberNo);
      } else {
         if(this.deviceState != "Completed") {
     //   this.router.navigate[('survey/deviceGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId, { state: { selectedOrderIds: selectedOrderIds, memberName: this.memberName } })];
        this.router.navigate(['survey/deviceGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId], { state: { selectedOrderIds: selectedOrderIds, memberName: this.memberName } });
      } else{
        this.openConfirmDialog('survey/deviceGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId, { state: { selectedOrderIds: selectedOrderIds, memberName: this.memberName }, queryParams: {isNotAutoSave: true}});
        //this.router.navigate(['survey/deviceGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId], { state: { selectedOrderIds: selectedOrderIds, memberName: this.memberName }, queryParams: {isNotAutoSave: true}});
      }
    }
  }
}

  openConfirmDialog(routeUrl: string, stateObject: Object) {
    let controls = this.genreFormArray.controls;
    // if(arrayForm instanceof FormArray){
    let count = 0;
    let dirtyCount = 0;
    let index = 0;
    this.timeLinesForm.get('dont')?.setValue('0');
    for (let control of controls) {
      if (control.dirty) {
        dirtyCount++;
      }
    }
    if(dirtyCount > 0) {
    this.confirmationDialogService.confirm('Are you sure', 'Do you really want to update the submitted answers.?', 'IAM SURE', 'NO')
      .then((confirmed) => {
        if (confirmed) {
          this.ignoreCanDeactivate = true;
          this.resubmitForm(routeUrl, stateObject);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    } else { 
      this.ignoreCanDeactivate = true;
      this.verifyNextpage();
    //  this.router.navigate(['survey/deviceGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId], { state: {memberName: this.memberName }, queryParams: {isNotAutoSave: true}});

    }
}

submitSSP() {
    const selectedOrderIds = this.timeLinesForm.value.genere
    .map((checked:any, i:any) => checked ? this.generes[i].id : null)
    .filter( (v:any) => v !== null);
    if(selectedOrderIds.length ==0 && this.timeLinesForm.get('dont')?.value!=1){
      this.showError =true;
      return;
    }
    if(selectedOrderIds.length== 0){
      let message = 'genres.message';
      let deviceMessage = 'genres.device-message';
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
         this.localStorageService.setSubmitDevice(this.deviceName);
         const message1 = 'deviceInformation.success2';
         this.router.navigate(['survey/Thankyou/deviceList/' +this.deviceState], { state: { message: message1, inputRoute:"submit_device", deviceName: this.deviceName  } });
       });
    } 
    } else {
      this.deviceService.saveGenreIds(selectedOrderIds);
      this.router.navigate(['survey/deviceGeneres/'+this.deviceState+'/'+this.memberNo+'/'+this.deviceId], { state: { selectedOrderIds: selectedOrderIds, memberName: this.memberName  } });
    }
  
  }


verifyNextpage() {
  const selectedOrderIds = this.timeLinesForm.value.genere
  .map((checked: any, i: any) => checked ? this.generes[i].id : null)
  .filter((v: any) => v !== null);

  if(selectedOrderIds.length == 0){
    this.router.navigate(['survey/selectChannel/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId + '/' + true], { state: { memberName: this.memberName }, queryParams: { isNotAutoSave: true } });
     } else {
      this.router.navigate(['survey/deviceGeneres/' + this.deviceState + '/' + this.memberNo + '/' + this.deviceId], { state: {memberName: this.memberName }, queryParams: {isNotAutoSave: true} });
  }
}

  resubmitForm(routeUrl: any, stateObject: any) {
   // this.ignoreCanDeactivate = true;
    let controls = this.genreFormArray.controls;
    // if(arrayForm instanceof FormArray){
    let count = 0;
    let dirtyCount = 0;
    let index = 0;
    this.timeLinesForm.get('dont')?.setValue('0');
    for (let control of controls) {
      if (control.dirty) {
        dirtyCount++;
        let value = control.value;
        if (this.isTvGenere) {
          let item = this.prepareItem(this.generes[index].id, value, true);
          this.deviceService.updateTvSelectGenres(item).
            subscribe((response: any) => {
              count++;
              if (dirtyCount == count) {
                this.router.navigate([routeUrl], stateObject);
              }
            });
        } else {
          let item = this.prepareItem(this.generes[index].id, value, false);
          this.deviceService.updateSelectGenres(item).
            subscribe((response: any) => {
              count++;
              if (dirtyCount == count) {
                this.router.navigate([routeUrl], stateObject);
              }
            });
        }
      }
      index++;
    }
    if (dirtyCount == 0) {
      this.router.navigate([routeUrl], stateObject);
    }
  }


  backAction() {
    let url;
    if (this.isTvGenere) {
      url = "television/household-members";
      this.router.navigateByUrl(url);
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
      const message = this.translate.instant('deviceInformation.success');
      this.router.navigate(['television/thankyou'], { state: { message: message } });
    } else {
      let message: any;
      if (this.deviceState == "Completed") {
        message = this.translate.instant('deviceInformation.success2');
      } else {
        message = this.translate.instant('deviceInformation.success');
      }
      this.router.navigate(['survey/Thankyou'], { state: { message: message } });

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

  get genersFormControl() {
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