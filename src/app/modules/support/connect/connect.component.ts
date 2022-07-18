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
  language: any;

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
      description: ['',Validators.required],
      lang:[]
    });

    this.techSupportFormControl.subject.setValue('');
    this.techSupportFormControl.description.setValue('');
    this.techSupportFormControl.lang.setValue('');
  }

  get techSupportFormControl() {
    return this.techSupportForm.controls;
  }

  submit(){
    this.language = localStorage.lang;
    this.techSupportForm.controls.lang.setValue(this.language);
    console.log(this.techSupportForm);

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
      // const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      //   ".ng-invalid"
      // );
  
      // firstInvalidControl.scrollIntoView();

      for (const key of Object.keys(this.techSupportForm.controls)) {
        if (this.techSupportForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
  }





    }
  }
}
export class TechSupport{
  subject?:string;
  description?:string;
  lang?:string;
}