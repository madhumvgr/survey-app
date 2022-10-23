import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  languageSubject$ =new Subject();
  constructor() {
  }

  getLanguageSubject(){
    return this.languageSubject$;
  }
  setLanguageItem(value: string) {
    this.setItem(StorageItem.LANG,value);
    this.languageSubject$.next(value);
  }

  setIdToken(value: string) {
    this.setItem(StorageItem.ID_TOKEN,value);
  }

  setUserName(value:string){
    this.setItem(StorageItem.USERNAME,value);
  }
  setProfileId(value:string){
    this.setItem(StorageItem.PROFILEID,value);
  }

  setDeviceName(value:string){
    this.setItem(StorageItem.DEVICENAME,value);
  }

  setMemberName(value:string){
    this.setItem(StorageItem.MEMBERNAME,value);
  }

  setIndividualName(value:string){
    this.setItem(StorageItem.INDIVIDUALNAME,value);
  }

  setUserFullName(userName:string){
    this.setItem(StorageItem.FULLNAME,userName);
  }

  setHomeId(homeNo:string){
    this.setItem(StorageItem.HOMEID,homeNo);
  }

  private setItem(key:string,value:string){
    localStorage.setItem(key,value);
  }

  getItem(name: string) {
    return localStorage.getItem(name);
  }

  setPanellistType(value:string){
    this.setItem(StorageItem.PANELLISTTYPE,value);
  }

  setSubmitDevice(value:string) {
    this.setItem(StorageItem.SUBMITDEVICE,value);
  }

  setAdmin(value: string) {
    this.setItem(StorageItem.ADMIN,value);
  }

  removeAllItem() {
    localStorage.clear();
  }

  setAdminName(value:string){
    this.setItem(StorageItem.ADMINNAME,value);
  }

  setTakeControl(value:any){
    this.setItem(StorageItem.TAKECONTROL,value);
   }

}
export enum StorageItem{
  LANG ='lang',
  ID_TOKEN='id_token',
  USERNAME='username',
  PROFILEID='profileId',
  DEVICENAME='deviceName',
  MEMBERNAME='memberName',
  FULLNAME='fullName',
  INDIVIDUALNAME='individualName',
  PANELLISTTYPE = 'panellistType',
  SUBMITDEVICE = 'submitDevice',
  TAKECONTROL = 'takeControl',
  HOMEID = 'homeId',
  ADMIN = 'isAdmin',
  ADMINNAME = 'adminName'
}