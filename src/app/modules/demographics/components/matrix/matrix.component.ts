import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnChanges {
  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  @Input() question!: Question;
  constructor() { }
  @Output()
  public changeEvent1 = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      let selected = this.question.selected;
      let prevValue = { rowValue: '', colValue:'' }
      if (selected) {
        prevValue = selected[selected.length-1];
      }
      if(this.question?.row){
        let rows = this.question.row;
        rows.forEach( row =>{
          if (this.question?.mandatory && prevValue) {
            this.childFormGroup.addControl('' + this.question?.queNo+row.value, new FormControl(prevValue?.colValue, Validators.required));
          } else {
            if (prevValue && prevValue.colValue)
              this.childFormGroup.addControl('' + this.question?.queNo+row.value, new FormControl(prevValue?.colValue));
            else {
              this.childFormGroup.addControl('' + this.question?.queNo+row.value, new FormControl(''))
            }
          }
        } );
      }
      // this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''))
      this.parentForm.addControl('' + this.question?.queNo, this.childFormGroup);
      this.onlyOnce = true;
    }
  }

  changeEvent(value: any, colSeq: any) {
    this.parentForm.get('' + this.question?.queNo)?.get('' + this.question.queNo)?.setValue(value);
    this.question.answer = "Y";
    this.question.questionLevel1Id = value;
    this.question.questionLevel2Id = colSeq;
    this.changeEvent1.emit(this.question);
  }
}
