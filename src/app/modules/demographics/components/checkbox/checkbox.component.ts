import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/modules/login/model/question.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() question: Question | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
