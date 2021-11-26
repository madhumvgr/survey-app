import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { NotificationService } from '../../service/notification.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: any;
  subscription: any = new Subscription();
  displayMessage : any;
   

  constructor(private notifService: NotificationService, private router: Router, private sharedService: SharedService, private zone: NgZone) {
    
  }

  ngOnInit(): void {
    
    this.subscription.add(this.sharedService.getMessagesObservable().subscribe(data => {
      this.zone.run(() => {
      this.messages = data;
        
      })
    }));
    const obj: any = this.notifService.displaymessage();
    if(obj?.id) {
      this.displayMessage = obj
    }
   
  }

  deleteMessage(messageId: any) {
    this.notifService.delete(messageId).subscribe(res =>
      this.router.navigateByUrl('/notification/messages')
      );
     
 }


  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }


}
