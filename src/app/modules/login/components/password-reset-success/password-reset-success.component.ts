import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-success',
  templateUrl: './password-reset-success.component.html',
  styleUrls: ['./password-reset-success.component.css']
})
export class PasswordResetSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  continue() {
    this.router.navigate(['login/login']);
  }
}
