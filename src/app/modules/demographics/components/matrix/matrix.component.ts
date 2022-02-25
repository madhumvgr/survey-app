import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/modules/login/model/question.model';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  @Input() question!: Question ;
  constructor() { }
  @Output()
  public changeEvent1 = new EventEmitter();

  ngOnInit(): void {
  }

  changeEvent(value: any) {
    this.question.answer = value;
    this.changeEvent1.emit(this.question);
  }
}
