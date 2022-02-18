import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/modules/login/model/question.model';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-questionarie',
  templateUrl: './questionarie.component.html',
  styleUrls: ['./questionarie.component.css']
})
export class QuestionarieComponent implements OnInit {
  questionList: Question[] = [];
  constructor(public questionaireService: QuestionaireService) {

   }

  ngOnInit(): void {
    this.questionaireService.list().subscribe( response => {
      this.questionList =response;
    }); 
  }

}
