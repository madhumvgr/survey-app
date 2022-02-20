import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/modules/login/model/question.model';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  @Input() question: Question | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
