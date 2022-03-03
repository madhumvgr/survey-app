import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';

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
 
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''))
      this.parentForm.addControl(''+this.question?.queNo,this.childFormGroup);
      this.onlyOnce = true;
    }
  }

  ngOnInit(): void {
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
