import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DeviceConstants, UrlConstants } from "src/app/shared/models/url-constants";
import { ResourceService } from "src/app/shared/services/http-resource.service";
import { environment } from "src/environments/environment";
import { TechSupport } from "../../support/connect/connect.component";
import { User } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends ResourceService<User> {
    [x: string]: any;
    constructor( public httpClient: HttpClient) {
      super(
        httpClient,
        environment.host,
        '/api/deviceInfo');
    }

    public getCustomRequest(url:any): Observable<any>{
      return this.httpClient
      .get(`${environment.host}${url}`)
      .pipe(map(data => data));
    }
    
    public getDeviceInfo(deviceId:any){
         return this.getCustomRequest(DeviceConstants.deviceInfo+deviceId);
    }

    public getDeviceInnerInfo(deviceId:any){
      return this.getCustomRequest(DeviceConstants.deviceInnerInfo+deviceId);
    }

    public getDevicePreviousStatus(deviceId:any){
      return this.getCustomRequest(DeviceConstants.devicePreviousStatus+deviceId);
    }

    public updateDeviceMember(item:any){
      return this.customCreate(item,DeviceConstants.deviceOwnerByDeviceId);
    }

    public updateDeviceMemberWithPercentage(item:any[]){
      return this.customCreate(item,DeviceConstants.memberDeviceUsagePostUrl);
    }

    public updateCoviewerWithPercentage(item:any){
      return this.customCreate(item,DeviceConstants.deviceCoviewerPostUrl);
    }
    
    public updateDeviceTimeLine(item:any){
      return this.customCreate(item,DeviceConstants.deviceGenersPostUrl);
    }

    public updateMemberSurvey(deviceId:string,memberNo:string){
      return this.customCreate({},DeviceConstants.memberHouseHoldSurveyPostUrl+deviceId+'/'+memberNo);
    }

    public updateHomeSurvey(deviceId:string){
      return this.customCreate({},DeviceConstants.deviceHouseHoldSurveyPostUrl+deviceId);
    }

    public updateNotInUse(deviceId:string){
      return this.update(DeviceConstants.markNotInUse+deviceId);
    }

    public updateInUse(deviceId:string){
      return this.update(DeviceConstants.markInUse+deviceId);
    }

    public updateTechSupport(data:TechSupport){
      return this.customCreate(data,DeviceConstants.techSupport);
    }
  }