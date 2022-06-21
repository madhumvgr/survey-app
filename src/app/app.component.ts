import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService, StorageItem } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event:any) {
    confirm("Please confirm, You are closing dialog");
    return false;
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event:any) {
    confirm("Please confirm, You are closing dialog");
    return false;
  }
  constructor(private translate: TranslateService, private localStorageService:LocalStorageService) {
    if(!this.localStorageService.getItem(StorageItem.LANG)){
      this.localStorageService.setLanguageItem("en");
      translate.setDefaultLang('en');
    }else{
      translate.setDefaultLang(''+this.localStorageService.getItem(StorageItem.LANG));
    }
  }
}
