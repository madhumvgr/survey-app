import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../model/message.model';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.css']
})
export class MessageCenterComponent implements OnInit {

  messages: Array<Message> = [];
  actions: Array<Message> = [];

  constructor(private notifService: NotificationService, private router: Router) {
    this.notifService.getUnReadMessageCount().subscribe(res => {
      
      let messages = res.reduce((obj: any[], cur: any) => {
        if (cur.messageType === "Message") {
          obj.push(cur)
        }
        return obj

      }, [])


      let actions = res.reduce((obj: any[], cur: any) => {
        if (cur.messageType === "Action") {
          obj.push(cur)
        }
        return obj

      }, [])

      console.log(messages);
      console.log(actions);
    })
  }

  ngOnInit(): void {
  }

  navToRegister() {
    this.router.navigate(['login/register']);
  }

  onSubmit() {
    this.navToRegister();

  }

  navToMessageDetail(messageId: any) {
    this.router.navigateByUrl('/messages/message/' + messageId);
  }

  deleteMessage(messageId: any) {
    this.notifService.delete(messageId).subscribe(res =>
      console.log("message deleted" + messageId));
  }
}
