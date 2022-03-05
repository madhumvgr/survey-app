import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';

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

  @Input() question!: Question ;
  constructor() { }
  @Output()
  public changeEvent1 = new EventEmitter();
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      let selected = this.question.selected;
      let prevValue ={rowValue:''}
      if(selected){
         prevValue= selected[selected.length -1];
      }
      if (this.question?.mandatory) {
        this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(prevValue?prevValue?.rowValue:'', Validators.required));
      } else {
          this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''));
      }
      this.parentForm.addControl(''+this.question?.queNo,this.childFormGroup);
      this.onlyOnce = true;
    }
  }

  get radioFormControl() {
    return this.childFormGroup.controls[''+this.question?.queNo];
  }

  changeEvent(value: any,event:any) {
    this.parentForm.get(''+this.question?.queNo)?.get(''+this.question.queNo)?.setValue(value);
    //console.log( event.target.checked);
    this.question.answer ="Y";
    this.question.questionLevel1Id = value;
    this.question.questionLevel2Id = null;
    //this.question.queType ="YES-NO";
    this.changeEvent1.emit(this.question);
  }
}
