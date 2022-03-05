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
      let prevValue = { rowValue: '' }
      if (selected) {
        prevValue = selected[selected.length - 1];
      }

//       0: {value: 148, seqNo: 1, text: 'Children’s clothing', description: null}
// 1: {value: 149, seqNo: 2, text: 'Men’s clothing', description: null}
// 2: {value: 150, seqNo: 3, text: 'Women’s clothing', description: null}
// 3: {value: 151, seqNo: 4, text: 'Cosmetics & fragrances', description: null}
// 4: {value: 152, seqNo: 5, text: 'Sporting goods', description: null}

      if(this.question?.row){
        let rows = this.question.row;
        rows.forEach( row =>{
          if (this.question?.mandatory && prevValue) {
            this.childFormGroup.addControl('' + this.question?.queNo+row.value, new FormControl(prevValue?.rowValue, Validators.required));
          } else {
            if (prevValue && prevValue.rowValue)
              this.childFormGroup.addControl('' + this.question?.queNo+row.value, new FormControl(prevValue?.rowValue));
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
    this.question.questionLevel1Id = colSeq;
    this.question.questionLevel2Id = value;
    console.log(this.question);
    this.changeEvent1.emit(this.question);
  }
}
