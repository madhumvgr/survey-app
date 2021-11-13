import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { DeviceConstants } from 'src/app/shared/models/url-constants';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-device-usage',
  templateUrl: './device-usage.component.html',
  styleUrls: ['./device-usage.component.css']
})
export class DeviceUsageComponent implements OnInit {

  deviceId : any;
  deviceState: any;
  memberList: any;
  ownerName: any;
  deviceName: any;
  button = 'Edit';
  isCompleted= false;
  constructor(private Activatedroute:ActivatedRoute, private localStorageService:LocalStorageService, private router: Router,private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceName = this.localStorageService.getItem(StorageItem.DEVICENAME);
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
    this.ownerName = this.Activatedroute.snapshot.params['memeberName'];
    this.deviceService.getCustomRequest(DeviceConstants.memberListByDeviceId + this.deviceId).subscribe(response => {
      if (response) {
        this.memberList = response;
        let count=0;
         this.memberList.forEach( (element1:any) => {
           if(element1.memberSurveyStatusId == 1){
              count++;
           }
         });
         if( count== this.memberList.length){
          this.isCompleted = true;
         }
      }
    });
  }
  continueNavigate(memberNo:any){ 
    this.router.navigateByUrl('survey/deviceGeneres/'+memberNo+'/'+this.deviceId);
  }

  submit() {
    // submit whole home survey. 
    this.deviceService.updateHomeSurvey(this.deviceId).subscribe(
      res => {console.log(res);
      });
  }


}
