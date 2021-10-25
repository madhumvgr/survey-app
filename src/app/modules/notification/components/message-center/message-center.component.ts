import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Message } from '../../model/message.model';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.css']
})
export class MessageCenterComponent implements OnInit, OnDestroy {

  messages: any;
  subscription: any = new Subscription();

  constructor(private notifService: NotificationService, 
    private sharedService: SharedService, 
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router, 
    private zone: NgZone) {

  }
  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.notifService.getMessageList();
    this.subscription.add(this.sharedService.getMessagesObservable().subscribe(data => {
      this.zone.run(() => {
        this.messages = data;
        this.changeDetectorRef.detectChanges();
      })
    }));
  }

  navToRegister() {
    this.router.navigate(['login/register']);
  }

  onSubmit() {
    this.navToRegister();

  }

  navToMessageDetail(message: any) {
    // if (!message.isRead) {
    //   this.notifService.markMessageRead(message.id).subscribe(res => {
    //     this.router.navigateByUrl('notification/message/' + message.id);
    //   });
    // } 

    //action
    if(message.messageType === "Action") {
      this.notifService.markMessageRead(message).subscribe(res => {
        this.router.navigateByUrl('notification/messages/action/' + message.id);
      })  
    } else{
      this.notifService.markMessageRead(message).subscribe(res => {
        this.router.navigateByUrl('notification/message/' + message.id);
        })
    }
  }
}
