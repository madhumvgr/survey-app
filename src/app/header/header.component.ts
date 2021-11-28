import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block } from '@material-ui/icons';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../modules/notification/service/notification.service';
import { AuthService } from '../shared/services/auth.service';
import { LocalStorageService, StorageItem } from '../shared/services/local-storage.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isMenu = true;
  @Input() isNotification = true;
  isFrance=false;
  subscription: any = new Subscription();
  messages: any;
  displayContent: any;
  notify = false;
  showOnlyMenu="none";
  fullName: any;
  constructor(public authService:AuthService,private translate: TranslateService,
     private localStorageService:LocalStorageService,
     private zone: NgZone, 
     private notifService: NotificationService,
     private sharedService: SharedService,
     private router: Router) { 
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    this.fullName = this.localStorageService.getItem(StorageItem.FULLNAME);
  }

  ngOnInit(): void {
    if(this.isMenu){
      this.notifService.getMessageList();
      this.subscription.add(this.sharedService.getMessagesObservable().subscribe((data:any) => {
        this.zone.run(() => {
          this.messages = data;
          if(this.messages.actions.length == 0 && this.messages.messages.length == 0) {
            this.isNotification = false;
          }else if(this.messages.actions.length != 0 && this.messages.messages.length != 0) {
            this.displayContent = " You have " +this.messages?.actions?.length+ " new action(s) and " +this.messages?.messages?.length+ " new message(s)";
          } else if(this.messages.actions.length != 0 && this.messages.messages.length == 0){
            this.displayContent = " You have " +this.messages?.actions?.length+ " new action(s)";
          } else{
            this.displayContent = " You have " +this.messages?.messages?.length+ " new message(s)";
          }
        })
      }));
    }
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

  openNotification() {
    this.notify = true;
    this.router.navigateByUrl('/notification/messages');
  }
  
  onMenuOpen(isOpen:Boolean){
    this.showOnlyMenu = isOpen? "block":"none";
  }

}
