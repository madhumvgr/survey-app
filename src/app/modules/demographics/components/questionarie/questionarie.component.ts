import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/modules/login/model/question.model';
import { QuestionaireService } from '../../quersionarie.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators
} from '@angular/forms';
import { QuestionConstants } from 'src/app/shared/models/url-constants';

@Component({
  selector: 'app-questionarie',
  templateUrl: './questionarie.component.html',
  styleUrls: ['./questionarie.component.css']
})
export class QuestionarieComponent implements OnInit {
  questionList: Question[] = [];
  config: any;
  homeNo: any;
  memberNo: any;
  constructor(public questionaireService: QuestionaireService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };

    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params['page'];

    });
    this.memberNo = this.route.snapshot.params['memberNo'];
    this.homeNo = this.route.snapshot.params['homeNo'];
  }

  ngOnInit(): void {
    this.questionaireService.list().subscribe(response => {
      this.questionList = response;
    });
  }
  
  markCompleteEvent(event:any){
    this.questionaireService.customCreate({},QuestionConstants.markSurveyCompleted+this.memberNo).subscribe ( result => {
      console.log(result);
    });
  }
}
