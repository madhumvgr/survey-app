import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
@Component({

  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnChanges {
  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  
  @Input() question!: Question;
  @Output()
  public changeEvent1 = new EventEmitter();
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''))
      this.parentForm.addControl(''+this.question?.queNo,this.childFormGroup);
      this.onlyOnce = true;
    }
  }
  
  changeEvent(event:any,row: any) {
    const formArray: FormArray = this.childFormGroup.get(row.seqNo) as FormArray;

    /* Selected */
  if(event.target.checked){
    // Add a new control in the arrayForm
    formArray.push(new FormControl(event.target.value));
  }
  /* unselected */
  else{
    // find the unselected element
    let i: number = 0;

    formArray.controls.forEach((ctrl: any) => {
      if(ctrl.value == event.target.value) {
        // Remove the unselected element from the arrayForm
        formArray.removeAt(i);
        return;
      }
      i++;
    });
  }
  
    this.parentForm.get(''+this.question?.queNo)?.get(''+this.question.queNo)?.setValue(row.value);
    this.question.answer = row.value;
    this.changeEvent1.emit(this.question);
  }
}
