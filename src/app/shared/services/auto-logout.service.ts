import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { LocalStorageService, StorageItem } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
  })
  export class AutoLogoutService {
  
    //log off details
    isLogin = false;
  
    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
        public authService:AuthService,
        // private snotifyService: SnotifyService,
        private ngZone: NgZone
    ) {
        debugger
      if(this.isUserLoggedIn()){
        this.isLogin=true;
      }
      this.lastAction(Date.now());
      this.check();
      this.initListener();
      this.initInterval();
    }
  
    /**
     * last action
     */
    getLastAction() {
      return localStorage.getItem('lastAction');
    }
  
    /**
     * set last action
     * @param value
     */
    lastAction(value: number) {
      localStorage.setItem('lastAction', JSON.stringify(value))
    }
  
    /**
     * start event listener
     */
    initListener() {
      this.ngZone.runOutsideAngular(() => {
        document.body.addEventListener('click', () => this.reset());
        document.body.addEventListener('keydown',() => this.reset());
        document.body.addEventListener('keyup',() => this.reset());
        document.body.addEventListener('keypress',() => this.reset());
      });
    }
  
    /**
     * time interval
     */
    initInterval() {
      this.ngZone.runOutsideAngular(() => {
        setInterval(() => {
          this.check();
        }, 1000);
      })
    }
  
    /**
     * reset timer
     */
    reset() {
      this.lastAction(Date.now());
    }
  
    /**
     * check timer
     */
    check() {
      const now = Date.now();
      const timeLeft = parseInt(this.getLastAction()!) + (15) * 60 * 1000;
      const diff = timeLeft - now;
      const isTimeout = diff < 0;
      //this.isLoggedIn.subscribe(event => this.isLogin = event);
      this.ngZone.run(() => {
        if (isTimeout && this.isLogin) {
            let removeToken = this.localStorageService.removeAllItem();
            if (removeToken == null) {
                this.router.navigate(['/login/login'], { queryParams: { logout: 'autologout' } });
            }
        //   localStorage.removeItem('user_id');
        //   localStorage.removeItem('lastAction');
        //   setTimeout(()=>{
        //     console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
        //   },10000);
        //   this.router.navigate(['/login/login']);
        }
      });
    }
  
    /**
     *check if a user is logged in
     */
    isUserLoggedIn() {
        let authToken = this.localStorageService.getItem(StorageItem.ID_TOKEN);
        return (authToken !== null) ? true : false;
    }
  }