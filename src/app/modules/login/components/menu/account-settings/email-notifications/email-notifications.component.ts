import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.css']
})
export class EmailNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(myForm: NgForm){
    console.log(myForm.value);
}

}
