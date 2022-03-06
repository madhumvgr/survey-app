import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit,OnChanges {

  @Input() homeNo:any;
  @Input() memberNo:any;
  @Input() memberName:any;
  @Input()
  questionList: Question[] = [];
  @Output()
  markCompleteEvent = new  EventEmitter();
  config: any;
  parentForm!: FormGroup;

  // collection = { count: 60, data: [{id:0,value:''}] };
  // config1 = {
  //   id: 'custom',
  //   itemsPerPage: 5,
  //   currentPage: 1,
  //   totalItems: this.collection.count
  // };

  // public maxSize: number = 7;
  // public directionLinks: boolean = true;
  // public autoHide: boolean = false;
  // public responsive: boolean = true;
  // public labels: any = {
  //     previousLabel: '<--',
  //     nextLabel: '-->',
  //     screenReaderPaginationLabel: 'Pagination',
  //     screenReaderPageLabel: 'page',
  //     screenReaderCurrentLabel: `You're on page`
  // };
  constructor(public questionaireService: QuestionaireService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };

    this.config.currentPage = this.route.snapshot.params['pageNo'];
  

    // let currentPage = localStorage.getItem('currentPage');
    // this.config = {
    //     currentPage: currentPage ? currentPage : 1 ,
    //     itemsPerPage: 2
    // };

    // this.route.queryParams.subscribe(params => {
    //   this.config.currentPage = params['page'];
    // });

    
    // //Create dummy data
    // for (var i = 0; i < this.collection.count; i++) {
    //   this.collection.data.push(
    //     {
    //       id: i + 1,
    //       value: "items number " + (i + 1)
    //     }
    //   );
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.parentForm = this.toFormGroup(this.questionList);
  }

  ngOnInit(): void {
    // this.questionaireService.list().subscribe(response => {
    //   this.questionList = response;
    // });
  }


  pageChange(newPage: any) {
    this.config.currentPage = newPage;
    //this.router.navigate(['/demographics/questionaire/'+this.memberNo+'/'+this.homeNo], { queryParams: { page: newPage } });
    this.router.navigate(['/demographics/questionaire/'+this.memberNo+'/'+this.homeNo+'/'+newPage]).then(() => {
      window.location.reload();
    });
    
    //  localStorage.setItem('currentPage', newPage);
    //this.config.currentPage = newPage;
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
    obj ['queType'] =question.queType;
    obj ['questionLevel1Id'] = question.questionLevel1Id;
    obj ['questionLevel2Id'] = question.questionLevel2Id;
    obj ['answer'] = question?.answer;
    obj ['memberNo'] = this.memberNo;
    obj ['maxLevel'] = question.maxLevel;

    this.questionaireService.customCreate(obj,QuestionConstants.answers).subscribe( data => {
      console.log(data);
    })
  }

  toFormGroup(questions: any[] ) {
    let group: any = {};
    return new FormGroup({});
  }

  markComplete(){
    this.markCompleteEvent.emit(null);
  }
}
