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
  collection: any[] = [];
 // questionaireFormGroup!: FormGroup;
  constructor(public questionaireService: QuestionaireService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };

    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params['page'];

    });
    // this.route.queryParamMap
    //         .map((params : any) => params.get('page'))
    //         .subscribe( (page:any) => this.config.currentPage = page);

    for (let i = 1; i <= 100; i++) {
      this.collection.push(i);
    }
  }

  ngOnInit(): void {
    this.questionaireService.list().subscribe(response => {
      this.questionList = response;
      // this.questionaireFormGroup = this.fb.group(
      //   {
      //     questions: this.fb.array([this.createQuestion()], Validators.required)
      //   }
      // )
    });
  }


  pageChange(newPage: any) {
    this.router.navigate(['/demographics/questionaire'], { queryParams: { page: newPage } });
  }

  createQuestion(): FormGroup {

    return this.fb.group({
      name: [null, Validators.required]
    })
  }

  changeEvent(question:any){

    let obj:any = {
    }
    obj ['questionId']= question.queId;
    obj ['questionLevel1Id'] = 1;
    obj ['questionLevel2Id'] = null;
    obj ['answer'] = question.answer;

    this.questionaireService.customCreate(obj,QuestionConstants.answers).subscribe( data => {
      console.log(data);
    })
  }
}
