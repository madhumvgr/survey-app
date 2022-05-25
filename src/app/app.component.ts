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

//   /**
//  * Browser's default confirmation dialog box.
//  */
//    @HostListener('window:beforeunload')
//    defaultConfirmation(): boolean {
//      if (!DIRTY_FORM_CHECK) return true;
//      else return false;
//    }
   
  constructor(private translate: TranslateService, private localStorageService:LocalStorageService) {
    if(!this.localStorageService.getItem(StorageItem.LANG)){
      this.localStorageService.setLanguageItem("en");
      translate.setDefaultLang('en');
    }else{
      translate.setDefaultLang(''+this.localStorageService.getItem(StorageItem.LANG));
    }
  }
}
