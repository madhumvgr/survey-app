import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isRegister = false;
  constructor() { }

  ngOnInit(): void {
  }
  registerForNotifi(){
    this.isRegister =true;
  }
}
