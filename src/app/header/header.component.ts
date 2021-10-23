import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isMenu = true;

  isLogin = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
    // this.isLogin = localStorage.getItem("id_token") ? true : false;
  }

}
