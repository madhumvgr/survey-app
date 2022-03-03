import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';

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
  @Input() question!: Question ;
  constructor() { }
  @Output()
  public changeEvent1 = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''))
      this.parentForm.addControl(''+this.question?.queNo,this.childFormGroup);
      this.onlyOnce = true;
    }
  }

  changeEvent(value: any, colSeq: any) {
    this.parentForm.get(''+this.question?.queNo)?.get(''+this.question.queNo)?.setValue(value);
    this.question.answer ="Y";
    this.question.questionLevel1Id = colSeq;
    this.question.questionLevel2Id = value;
    console.log(this.question);
    this.changeEvent1.emit(this.question);
  }
}
