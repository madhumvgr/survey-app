import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { DeviceService } from '../../login/services/device.service';
import { TechSupport } from '../connect/connect.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  subject:any;
  description:any;
  techSupport: TechSupport={};
  error: boolean = false;
  language: any;
  panelistType: any;
  constructor(private deviceService: DeviceService, private router: Router, private localStorageService: LocalStorageService) { 
    this.subject;
    this.description;
   
  }

  ngOnInit(): void {
    this.panelistType =  this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
  }

  submit(){
    this.language=localStorage.lang;
    this.techSupport= {
      subject:this.subject,
      description: this.description,
      lang: this.language
    }
    
    if(this.subject!=null){
      this.error = false;
      this.deviceService.updateTechSupport(this.techSupport).subscribe( res => {
        this.router.navigate(['/support/thankyou'],{state: {message: res.id}});
      });
    } else {
      this.error = true;
    }
  }
}