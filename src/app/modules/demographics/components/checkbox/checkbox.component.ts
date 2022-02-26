import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
@Component({

  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnChanges {
  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  
  @Input() question!: Question;
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
  
  changeEvent(value: any) {
    this.parentForm.get(''+this.question?.queNo)?.get(''+this.question.queNo)?.setValue(value);
    this.question.answer = value;
    this.changeEvent1.emit(this.question);
  }
}
