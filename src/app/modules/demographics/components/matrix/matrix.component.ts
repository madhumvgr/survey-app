import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

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

  cols: any[] = [];
  isFrance: any = false;
  constructor(  private localStorageService:LocalStorageService) {
    this.localStorageService.getLanguageSubject().subscribe( val => {
      this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    });
   }
  @Output()
  public changeEvent1 = new EventEmitter();
  @Input() houseHold:any;
  ngOnChanges(changes: SimpleChanges): void {
    let yesCol = {
      description: "",
      frDescription: "",
      rowValue: 1,
      seqNo: 1,
      text: "Yes",
      value: "Y",
    }
    let noCol = {
      description: "",
      frDescription: "",
      rowValue: 2,
      seqNo: 2,
      text: "No",
      value: "N",
    }
    this.cols.push(yesCol);
    this.cols.push(noCol);
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      // let selected = this.question.selected;
      let prevValue = { rowValue: '', colValue: '',answer:'' }
      // if (selected) {
      //   prevValue = selected[selected.length-1];
      // }
      if (this.question?.row && this.question.selected) {
        let rows = this.question.row;
        rows.forEach(row => {
          // getprevious value for the row. 
          prevValue = this.getPrevSelectedValue(this.question.selected, row.value);
          console.log(prevValue);
          if (this.question?.mandatory) {
            this.childFormGroup.addControl('' + this.question?.queNo + row.value, new FormControl(prevValue?.answer, Validators.required));
          } else {
            if (prevValue && prevValue.answer)
              this.childFormGroup.addControl('' + this.question?.queNo + row.value, new FormControl(prevValue?.answer));
            else {
              this.childFormGroup.addControl('' + this.question?.queNo + row.value, new FormControl(''))
            }
          }
        });
      }
      // var groupedCols = this.groupBy(this.question.column);
      // if (groupedCols) {
      //   this.cols = groupedCols[Object.keys(groupedCols)[0]];
      // }
      this.parentForm.addControl('' + this.question?.queNo, this.childFormGroup);
      this.onlyOnce = true;
    }
  }
  getPrevSelectedValue(selected: any[] | undefined, value: any) {
    if (selected) {
      return selected.find(sel => sel.rowValue === value);
    }
  }

  changeEvent(colSeq: any, value: any) {
    this.parentForm.get('' + this.question?.queNo)?.get('' + this.question.queNo)?.setValue(value);
    this.question.answer =  value;
    this.question.questionLevel1Id = colSeq;
    this.question.questionLevel2Id = null;
    this.changeEvent1.emit(this.question);
  }

  get formControl() {
    let questionNo;
    if(this.question?.queNo){
      questionNo= this.question?.queNo;
    }else{
      questionNo= this.question?.queId;
    }
    return this.childFormGroup.controls[''+questionNo];
  }
}


export class Column {
  value!: number;
  description!: string;
  rowValue!: number;
  seqNo!: number;
  text!: string;
}