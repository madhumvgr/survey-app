import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/modules/login/model/question.model';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html',
  styleUrls: ['./radiogroup.component.css']
})
export class RadiogroupComponent implements OnInit {

  @Input() question: Question | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
