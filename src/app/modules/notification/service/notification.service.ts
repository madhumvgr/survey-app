import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NotificationConstants, UrlConstants } from "src/app/shared/models/url-constants";
import { ResourceService } from "src/app/shared/services/http-resource.service";
import { environment } from "src/environments/environment";
import { UserSerializer } from "../../login/model/user.model";
import { Message } from "../model/message.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ResourceService<Message> {
  constructor(public httpClient: HttpClient) {
    super(
      httpClient,
      environment.host,
      NotificationConstants.api);
  }

  getUnReadMessageCount() {
    return this.customRead('');
  }

  getMessageList() {
    return this.customRead('/message');
  }

  markMessageRead(messageId: any) {
    return this.customUpdate('/read/' + messageId);
  }

}