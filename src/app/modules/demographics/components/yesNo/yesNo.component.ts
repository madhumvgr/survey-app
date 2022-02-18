import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/modules/login/model/question.model';

@Component({
  selector: 'app-yesNo',
  templateUrl: './yesNo.component.html',
  styleUrls: ['./yesNo.component.css']
})
export class YesNoComponent implements OnInit {

  @Input() question: Question | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
