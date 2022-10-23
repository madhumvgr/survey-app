import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DeviceConstants, TelevisionConstants, UrlConstants } from "src/app/shared/models/url-constants";
import { ResourceService } from "src/app/shared/services/http-resource.service";
import { environment } from "src/environments/environment";
import { TechSupport } from "../../support/connect/connect.component";
import { User } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends ResourceService<User> {
    [x: string]: any;
    existingHomes: any;
    genreIds: Array<Number> =[];
    headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    constructor( public httpClient: HttpClient) {
      super(
        httpClient,
        environment.host,
        'api/deviceInfo');
    }

    public saveGenreIds(genreIds:any){
      localStorage.setItem("GENREIDS",JSON.stringify(genreIds));
      //this.genreIds = genreIds;
    }

    public getGenreIds(){
      const ids= localStorage.getItem("GENREIDS");
      if(ids){
        return JSON.parse(ids);
      }
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

    public resetDevice(deviceId:any){
      return this.customCreate("",DeviceConstants.resetDeviceByDeviceId+deviceId);
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

    public updateSelectGenres(item:any){
      return this.customCreate(item,DeviceConstants.selectGenersPostUrl);
    }

    public updateTvSelectGenres(item:any){
      return this.customCreate(item,TelevisionConstants.selectTvGenersPostUrl);
    }
    public updateSelectChannel(item:any){
      return this.customCreate(item,DeviceConstants.selectChannelPostUrl);
    }
    public updateTvSelectChannel(item:any){
      return this.customCreate(item,TelevisionConstants.selectTvChannelPostUrl);
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

    public getExistingHomes(): Observable<any>{
      return this.httpClient
      .get(`${environment.host}${UrlConstants.getExistingHomes}`)
      .pipe(map(data => data));

    } public adminControl(homeNo:string){
      return this.customCreate({},UrlConstants.adminControl+homeNo);
    }

    public resetOwner(homeNo:string){
      return this.customCreate({},UrlConstants.resetOwner+homeNo);
    }

    public resetInd(homeNo:string, memberNo:any){
      return this.customCreate({},UrlConstants.resetInd + homeNo + '/' + memberNo);
    }

    public getAuditData(homeNo: String){
      return this.getCustomRequest(UrlConstants.audit + homeNo);

    }

    public uploadFile(){
      return this.customCreate({},UrlConstants.uploadFile);
    }

    postFile(formData: FormData): Observable<boolean> {
      const endpoint = environment.host+'api/admin-reset-user-data';
      // const formData: FormData = new FormData();
      // formData.append('file', fileToUpload, fileToUpload.name );
      const options = {} as any;
      return this.httpClient
        .post(endpoint,formData)
       .pipe(map(() => { return true; }))
  }
  }