import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../shared/services/auth.service';
import { LocalStorageService, StorageItem } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isMenu = true;
  isFrance=false;
  constructor(public authService:AuthService,private translate: TranslateService,
     private localStorageService:LocalStorageService) { 
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
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
    this.localStorageService.setLanguageItem(lang);
    this.translate.setDefaultLang(lang);
  }
}
