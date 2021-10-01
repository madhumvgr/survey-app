import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  notify = false;
  constructor() { }

  ngOnInit(): void {
  }
  openNotification(){
    this.notify = true;
  }
}
