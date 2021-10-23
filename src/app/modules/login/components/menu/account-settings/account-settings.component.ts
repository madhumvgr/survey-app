import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  isRegister= false;
  notify = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticatedUser(true);
  }

  registerForNotifi(){
    this.isRegister = true;
  }
}
