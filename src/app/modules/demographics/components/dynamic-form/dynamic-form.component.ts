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
  constructor(public questionaireService: QuestionaireService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };

    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params['page'];
    });
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
    this.router.navigate(['/demographics/questionaire/'+this.memberNo+'/'+this.homeNo], { queryParams: { page: newPage } });
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

    // questions.forEach(question => {
    //   group[question.queNo] = question.required ? new FormControl(question.value || '', Validators.required)
    //                                           : new FormControl(question.value || '');
    // });

    // questions.forEach(question => {
    //   let childFormGroup = new FormGroup({});
    //   childFormGroup.addControl('' + question?.queNo, new FormControl(''));
    //   this.parentForm.addControl(''+question?.queNo,childFormGroup);
    //   });
    return new FormGroup({});
  }

  markComplete(){
    console.log(this.parentForm);
   // this.markCompleteEvent.emit(null);
  }
}
