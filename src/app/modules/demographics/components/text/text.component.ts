
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnChanges {

  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  isFrance: any = false;
  ShowInput: boolean = false;
  @Input() question!: any ;
  @Input() houseHold:any;
  buttonClicked: any = false;
  constructor(  private localStorageService:LocalStorageService, public questionaireService: QuestionaireService) {
    this.localStorageService.getLanguageSubject().subscribe( val => {
      this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    });
   }
  @Output()
  public changeEvent1 = new EventEmitter();
  ngOnInit(): void {
    this.questionaireService.quersionSubjectRecevier$$.subscribe((res:any)=>{
      this.buttonClicked = res
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      let selected = this.question.selected;
      let prevValue ={rowValue:'', otherDesc: ''}
      if(selected){
         prevValue= selected[selected.length -1];
      }
      let questionNo;
      if(this.question?.queNo){
        questionNo= this.question?.queNo;
      }else{
        questionNo= this.question?.queId;
      }
      if (this.question?.mandatory) {
        this.childFormGroup.addControl('' +questionNo , new FormControl(prevValue?prevValue?.otherDesc:'', Validators.required));
      } else {
          this.childFormGroup.addControl('' + questionNo, new FormControl(''));
      }
      const selectedRow = this.question.row?.find((r:any)=> r.value == prevValue?.rowValue);
      this.parentForm.addControl(''+questionNo,this.childFormGroup);
      this.onlyOnce = true;
    }
  }

  get textFormControl() {
    let questionNo;
    if(this.question?.queNo){
      questionNo= this.question?.queNo;
    }else{
      questionNo= this.question?.queId;
    }
    return this.childFormGroup.controls[''+questionNo];
  }

  focusOut(event:any) {
    const value = event.target.value
    console.log(event)
    let questionNo;
    if(this.question?.queNo){
      questionNo= this.question?.queNo;
    }else{
      questionNo= this.question?.queId;
    }
    this.parentForm.get(''+questionNo)?.get(''+questionNo)?.setValue(value);
    //console.log( event.target.checked);
    this.question.answer ="Y";
    this.question.otherDescription = value;
    this.question.questionLevel1Id = null;
    this.question.questionLevel2Id = null;
    //this.question.queType ="YES-NO";
    this.changeEvent1.emit(this.question);
  }
}

