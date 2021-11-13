import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService, StorageItem } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  constructor(private translate: TranslateService, private localStorageService:LocalStorageService) {
    translate.setDefaultLang('en');
    if(!this.localStorageService.getItem(StorageItem.LANG))
    this.localStorageService.setLanguageItem("en");
  }
}
