import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NotificationConstants, UrlConstants } from "src/app/shared/models/url-constants";
import { ResourceService } from "src/app/shared/services/http-resource.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { environment } from "src/environments/environment";
import { Message } from "../model/message.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ResourceService<Message> {
  
  constructor(public httpClient: HttpClient,public sharedService: SharedService) {
    super(
      httpClient,
      environment.host,
      NotificationConstants.api);
  }
  getMessageList() {
     this.customRead(NotificationConstants.api).subscribe( messageList =>{
      let messages = messageList.reduce((obj: any[], cur: any) => {
        if (cur.messageType === "Message") {
          obj.push(cur)
        }
        return obj

      }, [])


      let actions = messageList.reduce((obj: any[], cur: any) => {
        if (cur.messageType === "Action") {
          obj.push(cur)
        }
        return obj

      }, []);
      const messagesList = {'messages':messages, 'actions':actions};
      this.sharedService.updateMessages(messagesList);
     });
  }

  markMessageRead(messageId: any) {
    return this.customUpdate('/read/' + messageId);
  }

}