import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  continue() {
    this.router.navigate(['login/login']);
  }
}
