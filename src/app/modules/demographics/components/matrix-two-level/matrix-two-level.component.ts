import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-matrix-two-level',
  templateUrl: './matrix-two-level.component.html',
  styleUrls: ['./matrix-two-level.component.css']
})
export class MatrixTwoLevelComponent implements OnChanges {
  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  @Input() question!: Question;
  @Input() questionId:any;
  cols: Column[] = [];
  isFrance: any = false;
  constructor(  private localStorageService:LocalStorageService) { }
  @Output()
  public changeEvent1 = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    var groupedCols = this.groupBy(this.question.column);
      if (groupedCols) {
        this.cols = groupedCols[Object.keys(groupedCols)[0]];
      }

    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      // let selected = this.question.selected;
      let prevValue = { rowValue: '', colValue: '', answer:'' }
      // if (selected) {
      //   prevValue = selected[selected.length-1];
      // }
      if (this.question?.row && this.question.selected) {
        let rows = this.question.row;
        rows.forEach(row => {
          // getprevious value for the row. 
          this.cols.forEach ( col => {
            prevValue = this.getPrevSelectedValue(this.question.selected, row.value, col.value);
            if (this.question?.mandatory && prevValue) {
              this.childFormGroup.addControl('' + this.question?.queId + row.value+ col.value, new FormControl(prevValue?.colValue+prevValue?.rowValue+prevValue?.answer, Validators.required));
            } else {
              if (prevValue && prevValue.colValue)
                this.childFormGroup.addControl('' + this.question?.queId +row.value+ col.value, new FormControl(prevValue?.colValue+prevValue?.rowValue+prevValue?.answer));
              else {
                this.childFormGroup.addControl('' + this.question?.queId + row.value+col.value, new FormControl(''))
              }
            }
          });
        });
      }
      
      this.parentForm.addControl('' + this.question?.queId, this.childFormGroup);
      this.onlyOnce = true;
    }
  }
  getPrevSelectedValue(selected: any[] | undefined, value: any, colValue : any) {
    if (selected) {
      return selected.find(sel => sel.rowValue === value && sel.colValue === colValue);
    }
  }

  groupBy(objectArray: any) {
    return objectArray.reduce((acc: any, obj: any) => {
      var key = obj['rowValue'];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  changeEvent(value: any, colSeq: any,answer:any) {
    this.parentForm.get('' + this.question?.queId)?.get('' + this.question.queId)?.setValue(value+answer);
    this.question.answer = answer;
    this.question.questionLevel1Id = value;
    this.question.questionLevel2Id = colSeq;
    this.changeEvent1.emit(this.question);
  }
}
export class Column {
  value!: number;
  description!: string;
  rowValue!: number;
  seqNo!: number;
  text!: string;
}