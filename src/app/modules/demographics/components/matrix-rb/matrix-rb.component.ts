import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-matrix-rb',
  templateUrl: './matrix-rb.component.html',
  styleUrls: ['./matrix-rb.component.css']
})
export class MatrixRbComponent implements OnChanges {
  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  @Input() question!: Question;

  //cols: Column[] = [];
  groupedCols : any;
  isFrance: any = false;
  buttonClicked: any = false;
  constructor(  private localStorageService:LocalStorageService, public questionaireService: QuestionaireService) { 
    this.localStorageService.getLanguageSubject().subscribe( val => {
      this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    });
  }
  @Output()
  public changeEvent1 = new EventEmitter();
  @Input() houseHold:any;
  ngOnChanges(changes: SimpleChanges): void {
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      // let selected = this.question.selected;
      let prevValue = { rowValue: '', colValue: '' }
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
            this.childFormGroup.addControl('' + this.question?.queNo + row.value, new FormControl(prevValue?.colValue, Validators.required));
          } else {
            if (prevValue && prevValue.colValue)
              this.childFormGroup.addControl('' + this.question?.queNo + row.value, new FormControl(prevValue?.colValue));
            else {
              this.childFormGroup.addControl('' + this.question?.queNo + row.value, new FormControl(''))
            }
          }
        });
      }
       this.groupedCols = this.groupBy(this.question.column);
     
     
     
      // if (groupedCols) {
      //   this.cols = groupedCols[Object.keys(groupedCols)[0]];
      //   console.log(this.cols);
      // }
      this.parentForm.addControl('' + this.question?.queNo, this.childFormGroup);
      this.onlyOnce = true;
    }
  }
  ngOnInit(): void {
    this.questionaireService.quersionSubjectRecevier$$.subscribe((res:any)=>{
      this.buttonClicked = res
    })
  }
  getPrevSelectedValue(selected: any[] | undefined, value: any) {
    if (selected) {
      return selected.find(sel => sel.rowValue === value);
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

  changeEvent(value: any, colSeq: any) {
    this.parentForm.get('' + this.question?.queNo)?.get('' + this.question.queNo)?.setValue(value);
    this.question.answer = "Y";
    this.question.questionLevel1Id = value;
    this.question.questionLevel2Id = colSeq;
    this.changeEvent1.emit(this.question);
  }

  get formControlMatrixRb() {
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
