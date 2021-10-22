import { Injectable } from '@angular/core';  
import { ReplaySubject, Subject } from 'rxjs';   
  
@Injectable({  
  providedIn: 'root'  
})  
export class SharedService {  
  
  messages$ = new ReplaySubject<any>(1);
  
  constructor() {  
  }  

  getMessagesObservable(){
      return this.messages$.asObservable();;
  }

  updateMessages(messageList:any) {
    this.messages$.next(messageList);
}
}  