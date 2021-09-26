import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerkey',
  templateUrl: './registerkey.component.html',
  styleUrls: ['./registerkey.component.css']
})
export class RegisterkeyComponent implements OnInit {

  model: any = {};
  password: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navToRegister() {
    this.router.navigate(['login/register']);
  }

  onSubmit() {
    this.navToRegister();

  }

}
