import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { ResourceService } from 'src/app/shared/services/http-resource.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelevisionService extends ResourceService<any> {
  [x: string]: any;
  constructor( public httpClient: HttpClient) {
    super(
      httpClient,
      environment.host,
      '/api/deviceInfo');
  }
  

  public getTelevision(){
    return this.httpClient.get("https://dev23.denologix.com/api/memberListByDeviceId-television");
  }

  
}
