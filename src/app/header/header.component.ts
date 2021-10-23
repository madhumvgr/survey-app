import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isMenu = true;
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  public doLogout() {
    this.authService.doLogout();
  }

}
