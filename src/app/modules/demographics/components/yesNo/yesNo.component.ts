import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-yesNo',
  templateUrl: './yesNo.component.html',
  styleUrls: ['./yesNo.component.css']
})
export class YesNoComponent implements OnInit, OnChanges {

  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  @Input() question: Question = new Question();
  @Output()
  public changeEvent1 = new EventEmitter();
  isFrance: any = false;
  constructor(  private localStorageService:LocalStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
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
        this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(prevValue? prevValue?.answer: '',Validators.required));
      }else{
        this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''));
      }
      this.parentForm.addControl(''+this.question?.queNo,this.childFormGroup);
      this.onlyOnce = true;      
    }
  }

  ngOnInit(): void {
  }

  get yesNoFormControl() {
    return this.childFormGroup.controls[''+this.question?.queNo];
  }


  changeEvent(value: any) {
    this.parentForm.get(''+this.question?.queNo)?.get(''+this.question.queNo)?.setValue(value);
    this.question.answer = value;
    this.question.questionLevel1Id = null;
    this.question.questionLevel2Id = null;
    console.log(this.question);
    this.changeEvent1.emit(this.question);
  }

}
