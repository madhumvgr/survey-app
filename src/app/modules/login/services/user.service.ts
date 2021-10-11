import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UrlConstants } from "src/app/shared/models/url-constants";
import { ResourceService } from "src/app/shared/services/http-resource.service";
import { environment } from "src/environments/environment";
import { User, UserSerializer } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {
    constructor( public httpClient: HttpClient) {
      super(
        httpClient,
        environment.host,
        UrlConstants.registerUser,
        new UserSerializer());
    }

    public signIn(user: any): Observable<any>{
      return this.httpClient
      .post(`${environment.host}${UrlConstants.login}`, user)
      .pipe(map(data => data));

    }

    public changePassword(user: any): Observable<any>{
      return this.httpClient
      .post(`${environment.host}${UrlConstants.changePassword}`, user)
      .pipe(map(data => data));

    }


    public initiateForgotPassword(user: any): Observable<any>{
      return this.httpClient
      .post(`${environment.host}${UrlConstants.initiateForgotPassword}`, user)
      .pipe(map(data => data));

    }

    public finishResetPassword(user: any): Observable<any>{
      return this.httpClient
      .post(`${environment.host}${UrlConstants.finishForgotPassword}`, user)
      .pipe(map(data => data));

    }

    
  }