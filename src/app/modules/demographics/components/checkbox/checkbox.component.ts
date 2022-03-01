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
  formArray: any[] = [];
  
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

    /* Selected */
  if(event.target.checked){
    // Add a new control in the arrayForm
    this.formArray.push(event.target.value);
  }
  /* unselected */
  else{
    // find the unselected element
    let i: number = 0;

    this.formArray.forEach((ctrl: any) => {
      if(ctrl == event.target.value) {
        // Remove the unselected element from the arrayForm
        this.formArray.splice(i,1);
        return;
      }
      i++;
    });
  }
  
    this.parentForm.get(''+this.question?.queNo)?.get(''+this.question.queNo)?.setValue(this.formArray);
    this.question.answer = this.formArray;
    this.changeEvent1.emit(this.question);
  }
}
