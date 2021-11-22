import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
import { ModalComponent, ModalConfig } from 'src/app/modules/shared/components/modal/modal.component';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { BaseComponent } from 'src/app/shared/util/base.util';
export interface Owner {
  memberName: string;
  memberNo: string;
  homeNo: string;
  deviceId: string;
  memberSurveyStatus: string;
  memberSurveyStatusId: string;
  usePercentage: string;

}
@Component({
  selector: 'app-device-owner-information',
  templateUrl: './device-owner-information.component.html',
  styleUrls: ['./device-owner-information.component.css']
})
export class DeviceOwnerInformationComponent extends BaseComponent implements OnInit {
  deviceId: any;
  deviceName:any;
  deviceState: any;
  ownerList: Owner[] = [];
  ownerSelect: any = "";
  error: boolean = false;
  selectedOwner: any = {};
  notUsed: boolean = false;
  singleMemeber: boolean = false;
  resubmit: boolean = false;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  deviceOwnerInfoForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, private Activatedroute: ActivatedRoute,
    private router: Router, private deviceService: DeviceService, private localStorageService:LocalStorageService) {
      super();
     }

     ngAfterViewInit(){
      super.afterViewInit(this.modalComponent);
    }

  ngOnInit(): void {
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
     this.deviceOwnerInfoForm = this.fb.group({
      selectedOwner: [''],
    });
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    if(this.deviceState == "Completed") {
      this.resubmit = true;
    }
    this.deviceService.getDeviceInfo(this.deviceId).subscribe(res => { 
      const deviceCheck = res.numberOfUsers;
      console.log(deviceCheck)
      if(deviceCheck == "4") {
        this.notUsed = true;
      }

    });
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        this.ownerList = response;
        const memberCount: any = this.ownerList.length;
        console.log(memberCount);
        if(memberCount == 1) {
          this.singleMemeber = true;
          console.log(this.singleMemeber)
        }

        // get owner information of a particular device. 
        this.deviceService.getCustomRequest(DeviceConstants.deviceOwnerByDeviceId + this.deviceId).subscribe(response => {
          if (response) {
              this.selectedOwner = response;
              this.deviceOwnerInfoForm.get('selectedOwner')?.setValue(this.selectedOwner['memberNo']); 
          }
        });
      }
    });
  }

  // convenience getter for easy access to form fields
  get deviceInfoFormControl() { return this.deviceOwnerInfoForm.controls; }

  continueNavigate() {
    let selectedOwner = this.deviceInfoFormControl["selectedOwner"];
    if (selectedOwner.value == '') {
      this.error = true;
    }
    console.log(selectedOwner.value);
    let selectedOwn: any;
    selectedOwn = this.ownerList.filter(owner => owner.memberNo === selectedOwner.value)[0];
    // post call to save device member information.
    let device = {
      "deviceId": this.deviceId,
      "homeNo": selectedOwn["homeNo"],
      "memberNo": selectedOwn["memberNo"]
    }

    this.deviceService.updateDeviceMember(device).subscribe(response => {
      console.log(response);
      if(this.notUsed) {
       const message ="You have successfully update " +this.deviceName+ " device state";
        this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: {message: message}});
      }else if(this.singleMemeber) {
        this.router.navigateByUrl('survey/deviceUsage/' + this.deviceState + '/' + this.deviceId);
      } else{
        this.router.navigateByUrl('survey/multiUserList/' + this.deviceState + '/' + this.deviceId);
      }
    
    });
  }

  exitEvent(isBackAction:boolean) {
    const message ="You have successfully submitted " +this.deviceName+ " device information to us";
     this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: {message: message}});
   }

   resubmitForm() {
    const message ="Thank you for updating your info page! ";
  this.router.navigate(['survey/Thankyou/'+this.deviceName], {state: {message: message}});
  }

}
