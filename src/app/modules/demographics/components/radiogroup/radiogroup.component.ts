import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html',
  styleUrls: ['./radiogroup.component.css']
})
export class RadiogroupComponent implements OnChanges {

  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  isFrance: any = false;
  @Input() question!: Question ;
  @Input() houseHold:any;
  constructor(  private localStorageService:LocalStorageService) { }
  @Output()
  public changeEvent1 = new EventEmitter();
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      let selected = this.question.selected;
      let prevValue ={rowValue:''}
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
        this.childFormGroup.addControl('' +questionNo , new FormControl(prevValue?prevValue?.rowValue:'', Validators.required));
      } else {
          this.childFormGroup.addControl('' + questionNo, new FormControl(''));
      }
      this.parentForm.addControl(''+questionNo,this.childFormGroup);
      this.onlyOnce = true;
    }
  }

  get radioFormControl() {
    let questionNo;
    if(this.question?.queNo){
      questionNo= this.question?.queNo;
    }else{
      questionNo= this.question?.queId;
    }
    return this.childFormGroup.controls[''+questionNo];
  }

  changeEvent(value: any,event:any) {
    let questionNo;
    if(this.question?.queNo){
      questionNo= this.question?.queNo;
    }else{
      questionNo= this.question?.queId;
    }
    this.parentForm.get(''+questionNo)?.get(''+questionNo)?.setValue(value);
    //console.log( event.target.checked);
    this.question.answer ="Y";
    this.question.questionLevel1Id = value;
    this.question.questionLevel2Id = null;
    //this.question.queType ="YES-NO";
    this.changeEvent1.emit(this.question);
  }
}
