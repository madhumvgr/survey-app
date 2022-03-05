import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  formArray: number[] = [];

  @Input() question!: Question;
  @Output()
  public changeEvent1 = new EventEmitter();
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      let selected = this.question.selected;
      let prevValue ={rowValue:''}
      if(selected){
         prevValue= selected[selected.length -1];
      }
      if (this.question?.mandatory && prevValue) {
        this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(prevValue?.rowValue, Validators.required));
      } else {
        if (prevValue && prevValue.rowValue)
          this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(prevValue?.rowValue));
        else {
          this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''))
        }
      }
      this.parentForm.addControl(''+this.question?.queNo,this.childFormGroup);
      //this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''));
      this.onlyOnce = true;
    }
  }

  changeEvent(value:any, event: any) {

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      this.question.answer = "Y";
      this.formArray.push(event.target.value);
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;
      this.question.answer = "N";
      this.formArray.forEach((ctrl: any) => {
        if (ctrl == event.target.value) {
          // Remove the unselected element from the arrayForm
          this.formArray.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.parentForm.get('' + this.question?.queNo)?.get('' + this.question.queNo)?.setValue('Y');
    //this.question.answer = this.formArray;
    this.question.questionLevel1Id = event.target.value;
    this.question.questionLevel2Id = null;
    this.changeEvent1.emit(this.question);
  }
}
