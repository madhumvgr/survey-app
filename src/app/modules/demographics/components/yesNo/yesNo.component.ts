import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-yesNo',
  templateUrl: './yesNo.component.html',
  styleUrls: ['./yesNo.component.css']
})
export class YesNoComponent implements OnInit, OnChanges {

  @Input()
  pageButtonClicked:any;
  
  @Input() newPage:any;
  urlPage:any;
  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  @Input() question: Question = new Question();
  @Input() houseHold:any;
  questionNo: string= "0";
  @Output()
  public changeEvent1 = new EventEmitter();
  isFrance: any = false;
  buttonClicked: any = false;
  constructor(  private localStorageService:LocalStorageService, public questionaireService: QuestionaireService) { 
    this.localStorageService.getLanguageSubject().subscribe( val => {
      this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.houseHold){
      this.questionNo = ""+this.question?.hhQueNo; 
    }else{
      this.questionNo = ""+this.question?.queNo;
    }
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      let selected = this.question.selected;
      let prevValue ={answer:''}
      if(selected){
         prevValue= selected[selected.length -1];
      }
      if(this.question?.mandatory){
        this.childFormGroup.addControl(this.questionNo, new FormControl(prevValue? prevValue?.answer: '',Validators.required));
      }else{
        this.childFormGroup.addControl(this.questionNo, new FormControl(''));
      }
      this.parentForm.addControl(this.questionNo,this.childFormGroup);
      this.onlyOnce = true;      
    }
  }

  ngOnInit(): void {
    this.questionaireService.quersionSubjectRecevier$$.subscribe((res:any)=>{
      this.buttonClicked = res
    })
    this.urlPage=window.location.href.split('/').pop();
  }

  get yesNoFormControl() {
    return this.childFormGroup.controls[this.questionNo];
  }


  changeEvent(value: any) {
    this.parentForm.get(this.questionNo)?.get(this.questionNo)?.setValue(value);
    this.question.answer = value;
    this.question.questionLevel1Id = null;
    this.question.questionLevel2Id = null;
    console.log(this.question);
    this.changeEvent1.emit(this.question);
  }

}
