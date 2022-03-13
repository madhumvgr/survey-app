import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/modules/login/model/question.model';
import { QuestionaireService } from '../../quersionarie.service';
import { BaseComponent } from 'src/app/shared/util/base.util';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators
} from '@angular/forms';
import { QuestionConstants } from 'src/app/shared/models/url-constants';
import { ModalComponent } from 'src/app/modules/shared/components/modal/modal.component';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent extends BaseComponent implements OnInit,OnChanges,AfterViewInit {

  @Input() homeNo:any;
  @Input() memberNo:any;
  @Input() memberName:any;
  @Input() houseHold:any;
  @Input()
  questionList: Question[] = [];
  @Output()
  markCompleteEvent = new  EventEmitter();
  config: any;
  parentForm!: FormGroup;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  
  constructor(public questionaireService: QuestionaireService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
      super();
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };

    this.config.currentPage = this.route.snapshot.params['pageNo'];
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.parentForm = this.toFormGroup(this.questionList);
  }

  ngOnInit(): void {
  }

  
  ngAfterViewInit() {
    super.afterViewInit(this.modalComponent);
  }


  pageChange(newPage: any) {
    this.config.currentPage = newPage;
    //this.router.navigate(['/demographics/questionaire/'+this.memberNo+'/'+this.homeNo], { queryParams: { page: newPage } });
    if(this.houseHold){
      this.router.navigate(['/demographics/questionaire/true/'+newPage]).then(() => {
        window.location.reload();
      });
    }else{
      this.router.navigate(['/demographics/questionaire/'+this.memberNo+'/'+this.homeNo+'/'+newPage]).then(() => {
        window.location.reload();
      });
    }
   
    
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

    if(this.houseHold){
      this.questionaireService.customCreate(obj,QuestionConstants.houseHoldAnswers).subscribe( data => {
        console.log(data);
      });
    }else{
      this.questionaireService.customCreate(obj,QuestionConstants.answers).subscribe( data => {
        console.log(data);
      });
    }
  }

  toFormGroup(questions: any[] ) {
    let group: any = {};
    return new FormGroup({});
  }

  markComplete(){
    this.markCompleteEvent.emit(null);
  }

  cancelEvent(isBackAction: boolean) {
    console.log(isBackAction);
  }
  exitEvent(isBackAction: boolean) {
    this.markComplete();
    // if (this.isTvGenere) {
    //   const message = "You have successfully submitted information to us";
    //   this.router.navigate(['television/thankyou'], { state: { message: message } });
    // } else {
    //   const message = "You have successfully submitted " + this.deviceName + " device information to us";
    //   this.router.navigate(['survey/Thankyou/' + this.deviceName], { state: { message: message } });

    // }
  }
}
