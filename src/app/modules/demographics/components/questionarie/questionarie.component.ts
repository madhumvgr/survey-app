import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/modules/login/model/question.model';
import { QuestionaireService } from '../../quersionarie.service';


@Component({
  selector: 'app-questionarie',
  templateUrl: './questionarie.component.html',
  styleUrls: ['./questionarie.component.css']
})
export class QuestionarieComponent implements OnInit {
  questionList: Question[] = [];
  config: any; 
  collection: any[] = [];
  constructor(public questionaireService: QuestionaireService,
    private route: ActivatedRoute, private router: Router) {
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
    this.questionaireService.list().subscribe( response => {
      this.questionList =response;
    }); 
  }

  
  pageChange(newPage:any) {
		this.router.navigate(['/demographics/questionaire'], { queryParams: { page: newPage } });
	}
}
