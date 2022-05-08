import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DeviceConstants, UrlConstants } from "src/app/shared/models/url-constants";
import { ResourceService } from "src/app/shared/services/http-resource.service";
import { environment } from "src/environments/environment";
import { User } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService extends ResourceService<any> {
    constructor( public httpClient: HttpClient) {
      super(
        httpClient,
        environment.host,
        'api/email-notification-settings');
    }
  }