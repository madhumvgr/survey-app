import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/modules/login/model/question.model';
@Component({

  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() question!: Question;
  @Output()
  public changeEvent1 = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  
  changeEvent(value: any) {
    this.question.answer = value;
    this.changeEvent1.emit(this.question);
  }
}
