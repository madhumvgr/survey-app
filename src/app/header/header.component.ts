import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isMenu = true;
  isFrance=false;
  constructor(public authService:AuthService,private translate: TranslateService) { 
    this.isFrance = localStorage.getItem("lang") === "fr";
  }

  ngOnInit(): void {
  }

  public doLogout() {
    this.authService.doLogout();
  }

  changeLanguage(lang: string){
    if(lang ==='fr'){
      this.isFrance=true;
    }else{
      this.isFrance= false;
    }
    localStorage.setItem("lang",lang);
    this.translate.setDefaultLang(lang);
  }
}
