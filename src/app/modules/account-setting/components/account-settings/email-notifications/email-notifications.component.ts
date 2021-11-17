import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/modules/login/services/device.service';
import { EmailNotificationService } from 'src/app/modules/login/services/email-notifcation.service';

@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.css']
})
export class EmailNotificationsComponent implements OnInit {
 
  emailNotifForm: FormGroup = this.fb.group({});
  emailNotification : EmailNotification = new EmailNotification();
  constructor(private fb: FormBuilder,private Activatedroute:ActivatedRoute,private router: Router, 
    private emailNotifService: EmailNotificationService) { 
      this.emailNotifForm = this.fb.group({
        //set to empty. 
        homeNo: [''],
        companyNews: ['true'],
        promotionOffers: ['true'],
        loginEvent: ['true']
      });

      this.emailNotifService.read("000010").subscribe( res => {
        console.log(res);
        // need to set response to form. 
       this.emailNotifFormControl.companyNews.setValue(''+res.companyNews);
       this.emailNotifFormControl.promotionOffers.setValue(''+res.promotionOffers);
       this.emailNotifFormControl.loginEvent.setValue(''+res.loginEvent);
      });
    }

  ngOnInit(): void {
  }

  get emailNotifFormControl() {
    return this.emailNotifForm.controls;
  }

  saveAndExit(){
    this.emailNotifForm.patchValue({
      homeNo:"000010"
    })
    this.emailNotifService.create(this.emailNotifForm.value).subscribe( res => {
      console.log("Email notification update"+res);
      this.router.navigate(['/account-settings/thankyou/Email Notifications'],{state: {message: "Email Notifications"}});
    });
  }

}
export class EmailNotification {
  companyNews: string | undefined;
  promotionOffers: string | undefined;
  loginEvent: string | undefined;
  homeNo: string | undefined;
 
}