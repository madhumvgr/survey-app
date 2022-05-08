import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TelevisionConstants } from 'src/app/shared/models/url-constants';
import { ResourceService } from 'src/app/shared/services/http-resource.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelevisionService extends ResourceService<any> {
  [x: string]: any;
  constructor(public httpClient: HttpClient) {
    super(
      httpClient,
      environment.host,
      '/api');
  }

  public getCustomRequest(url: any): Observable<any> {
    return this.httpClient
      .get(`${environment.host}${url}`)
      .pipe(map(data => data));
  }

  public getTelevision() {
    return this.getCustomRequest(TelevisionConstants.memberList);
  }

  public tvStationByMember(memberId: string) {
    return this.getCustomRequest(TelevisionConstants.tvStationByMember + memberId)
  }

  public updateDeviceTimeLine(item:any){
    return this.customCreate(item,TelevisionConstants.updateTimeLine);
  }

  public updateMemberSurvey(memberNo:string){
    return this.customCreate({},TelevisionConstants.markMember+memberNo);
  }

  public getAllTelevisionStation(memberId:string){
    return this.getCustomRequest(TelevisionConstants.getStations + memberId);
  }

  public updateTelevisionStation(item:any){
    return this.customCreate(item,TelevisionConstants.updateStations);
  }

  public updateStationsWithDeviceId(item:any){
    return this.customCreate(item,TelevisionConstants.updateStationsWithDeviceId);
  }


}