import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messageId: string;
  constructor(private activatedroute:ActivatedRoute, private notificationService:NotificationService) {
    this.messageId = this.activatedroute.snapshot.params['deviceId'];
    this.notificationService.markMessageRead(this.messageId);
  }

  ngOnInit(): void {
  }
}
