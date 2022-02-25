import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';

@Component({
  selector: 'app-yesNo',
  templateUrl: './yesNo.component.html',
  styleUrls: ['./yesNo.component.css']
})
export class YesNoComponent implements OnInit {

  @Input()
  //formGroup!: FormGroup;
 // childFormGroup!: FormGroup;

  @Input() question!: Question;
  @Output()
  public changeEvent1 = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
   // this.childFormGroup.addControl(''+this.question?.name, new FormControl(''))
    
    /* Bind your child form control to parent form group
       changes in 'nameTxt' directly reflect to your parent 
       component formGroup
      */          
 //  this.formGroup.addControl(''+this.question?.name, this.childFormGroup.controls.name);
  }

  changeEvent(value: any) {
    this.question.answer = value;
    this.changeEvent1.emit(this.question);
  }

}
