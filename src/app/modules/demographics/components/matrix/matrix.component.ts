import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';

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
  buttonClicked: any = false;
  constructor(  private localStorageService:LocalStorageService, public questionaireService: QuestionaireService) {
    this.localStorageService.getLanguageSubject().subscribe( val => {
      this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    });
   }
  @Output()
  public changeEvent1 = new EventEmitter();
  urlPage:any;
  @Input() houseHold:any;
  @Input()
  pageButtonClicked:any;
  questionNo: string= "0";
  @Input() newPage:any;
  ngOnChanges(changes: SimpleChanges): void {

    if(this.houseHold){
      this.questionNo = ""+this.question?.queId; 
    }else{
      this.questionNo = ""+this.question?.queNo;
    }
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
            this.childFormGroup.addControl('' + this.questionNo + row.value, new FormControl(prevValue?.answer, Validators.required));
          } else {
            if (prevValue && prevValue.answer)
              this.childFormGroup.addControl('' + this.questionNo + row.value, new FormControl(prevValue?.answer));
            else {
              this.childFormGroup.addControl('' + this.questionNo + row.value, new FormControl(''))
            }
          }
        });
      }
      // var groupedCols = this.groupBy(this.question.column);
      // if (groupedCols) {
      //   this.cols = groupedCols[Object.keys(groupedCols)[0]];
      // }
      this.parentForm.addControl('' + this.questionNo, this.childFormGroup);
      this.onlyOnce = true;
    }
  }
  ngOnInit(): void {
    this.questionaireService.quersionSubjectRecevier$$.subscribe((res:any)=>{
      this.buttonClicked = res
    })
    this.urlPage=window.location.href.split('/').pop();
  }
  getPrevSelectedValue(selected: any[] | undefined, value: any) {
    if (selected) {
      return selected.find(sel => sel.rowValue === value);
    }
  }

  changeEvent(colSeq: any, value: any, skip?: any) {
    this.parentForm.get('' + this.questionNo)?.get('' + this.questionNo)?.setValue(value);
    this.question.answer =  value;
    this.question.questionLevel1Id = colSeq;
    this.question.questionLevel2Id = null;
    this.question.skip =skip;
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