import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  error: boolean = false;

  techSupportInfo: TechSupport = new TechSupport();
  techSupportForm: FormGroup = this.fb.group({});

  constructor(private deviceService: DeviceService, private fb: FormBuilder, private router: Router, private el: ElementRef) { 
    this.subject;
    this.description;
   
  }

  ngOnInit(): void {
    this.techSupportForm = this.fb.group({
      //set to empty. 
      subject: ['',Validators.required],
      description: ['',Validators.required]
    });

    this.techSupportFormControl.subject.setValue('');
    this.techSupportFormControl.description.setValue('');
  }

  get techSupportFormControl() {
    return this.techSupportForm.controls;
  }

  submit(){
    
    if(this.techSupportForm.valid){
      this.error = false;
      this.deviceService.updateTechSupport(this.techSupportForm.value).subscribe( res => {
        if(res) {
          this.router.navigate(['/support/thankyou'],{state: {message: res.id}});
        } else{
          this.error = true;
        }
        
      });
    } else {
      this.error = true;
      const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
        ".ng-invalid"
      );
  
      firstInvalidControl.scrollIntoView();
    }
  }
}
export class TechSupport{
  subject?:string;
  description?:string;
}