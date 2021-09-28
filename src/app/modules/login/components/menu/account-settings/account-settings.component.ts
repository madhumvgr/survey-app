import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  isRegister= false;
  constructor() { }

  ngOnInit(): void {
  }

  registerForNotifi(){
    this.isRegister = true;
  }
}
