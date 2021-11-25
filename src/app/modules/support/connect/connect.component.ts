import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from '../../login/services/device.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  subject:any;
  description:any;
  techSupport: TechSupport={};
  constructor(private deviceService: DeviceService, private router: Router) { 
    this.subject;
    this.description;
   
  }

  ngOnInit(): void {
  }

  submit(){
    this.techSupport= {
      subject:this.subject,
      description: this.description
    }
    
    if(this.subject!=null){
      this.deviceService.updateTechSupport(this.techSupport).subscribe( res => {
        this.router.navigate(['/support/thankyou'],{state: {message: res.id}});
      });
    }
  }
}
export interface TechSupport{
  subject?:string,
  description?:string;
}