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
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() homeNo: any;
  @Input() memberNo: any;
  @Input() memberName: any;
  @Input() houseHold: any;
  @Input()
  questionList: Question[] = [];
  @Output()
  markCompleteEvent = new EventEmitter();
  config: any;
  parentForm!: FormGroup;
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  panelListType: any;
  isReview!: boolean;
  finalQuestionLIst: any = [];
  userType = localStorage.panellistType;

  constructor(public questionaireService: QuestionaireService, private translate: TranslateService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private localStorageService: LocalStorageService) {
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
   this.panelListType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
  }


  ngAfterViewInit() {
    super.afterViewInit(this.modalComponent);
  }


  pageChange(newPage: any) {
    this.questionaireService.SetQuestionValid(true)
    if (this.parentForm.valid || (newPage < this.config.currentPage)) {     
      this.config.currentPage = newPage;
      //this.router.navigate(['/demographics/questionaire/'+this.memberNo+'/'+this.homeNo], { queryParams: { page: newPage } });
      if (this.houseHold) {
        this.router.navigate(['/demographics/questionaire/true/' + this.memberNo + '/' + newPage + '/true']).then(() => {
          window.location.reload();
        });
      } else {
        this.router.navigate(['/demographics/questionaire/' + this.memberNo + '/' + this.homeNo + '/' + newPage]).then(() => {
          window.location.reload();
        });
      }
    }


    //  localStorage.setItem('currentPage', newPage);
    //this.config.currentPage = newPage;
  }

  createQuestion(): FormGroup {

    return this.fb.group({
      name: [null, Validators.required]
    })
  }

  changeEvent(question: any) {
    console.log(question);
    let obj: any = {
    }
    if(this.houseHold && this.panelListType != "VAM") {
      obj['questionId'] = question.queId;
      obj['queType'] = question.queType;
      obj['questionLevel1Id'] = question.questionLevel1Id;
      obj['questionLevel2Id'] = question.questionLevel2Id;
      obj['answer'] = question?.answer;
      obj['memberNo'] = this.memberNo;
      obj['maxLevel'] = question.maxLevel;
      obj['otherDescription'] = question.otherDescription;
      obj['condQuestionId'] = question.condQuestionId;
      obj['condQuestionLevel1Id'] = question.condQuestionLevel1Id;
      obj['condQuestionLevel2Id'] = question.condQuestionLevel2Id;
      obj['condAnswer'] = question.condAnswer;
      obj['condQueType'] = question.condQueType;
      obj['condMaxLevel'] = question.condMaxLevel;
      obj['condOtherDescription'] = question.condOtherDescription;
    } else {
    obj['questionId'] = question.queId;
    obj['queType'] = question.queType;
    obj['questionLevel1Id'] = question.questionLevel1Id;
    obj['questionLevel2Id'] = question.questionLevel2Id;
    obj['answer'] = question?.answer;
    obj['memberNo'] = this.memberNo;
    obj['maxLevel'] = question.maxLevel;
    obj['otherDescription'] = question.otherDescription;
    obj['condQuestionId'] = question.condQuestionId;
    obj['condQuestionLevel1Id'] = question.condQuestionLevel1Id;
      obj['condQuestionLevel2Id'] = question.condQuestionLevel2Id;
      obj['condAnswer'] = question.condAnswer;
      obj['condQueType'] = question.condQueType;
      obj['condMaxLevel'] = question.condMaxLevel;
      obj['condOtherDescription'] = question.condOtherDescription;
  }

    if (this.houseHold && this.panelListType != "VAM") {
      this.questionaireService.customCreate(obj, QuestionConstants.houseHoldAnswers).subscribe(data => {
        console.log(data);
      });
    } else if (this.houseHold == undefined && this.panelListType != "VAM") {
      this.questionaireService.customCreate(obj, QuestionConstants.answers).subscribe(data => {
        console.log(data);
      });
    } else if (this.houseHold == undefined && this.panelListType == "VAM") {
      this.questionaireService.customCreate(obj, QuestionConstants.vam_answers).subscribe(data => {
        console.log(data);
      });
    } else {
      this.questionaireService.customCreate(obj, QuestionConstants.vam_houseHoldAnswers).subscribe(data => {
        console.log(data);
      });
    }
  }

  toFormGroup(questions: any[]) {
    let group: any = {};
    return new FormGroup({});
  }

  markComplete() {
    this.markCompleteEvent.emit(null);
  }

  cancelEvent(isBackAction: boolean) {
    console.log(isBackAction);
  }

  submit() {
    this.markCompleteEvent.emit({ isSubmit: true });
  }

  review() {
    this.questionaireService.SetQuestionValid(true)
    this.markCompleteEvent.emit({ isBack: false });
    if(this.parentForm.valid) {
    const panelistType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);

    if (this.houseHold) {
      if (panelistType != "VAM") {
        this.questionaireService.customRead(QuestionConstants.houseHoldQuestions+ '/' + this.memberNo).subscribe(list => {
          this.questionList = list;
          this.transForm();

        })
      }
      else {
        this.questionaireService.customRead(QuestionConstants.vam_houseHoldQuestions + '/' + this.memberNo).subscribe(list => {
          this.questionList = list;
          this.transForm();
        })
      }
    } else if (this.houseHold == undefined && panelistType != "VAM") {
      this.questionaireService.list().subscribe(response => {
        this.questionList = response;
        this.transForm();

      });
    } else {
      this.questionaireService.customRead(QuestionConstants.vam_questionaire + '/' + this.memberNo).subscribe(list => {
        this.questionList = list;
        this.transForm();
      })
    }
  }

  }

  transForm() {
    this.finalQuestionLIst = [];
    this.isReview = true;
    this.questionList.map((q: any) => {
      if (q.selected.length) {
        const obj: any = { hhQueNo: q.hhQueNo, queNo: q.queNo, title: q.title, titleFr: q.titleFr, anuswer: {} };
        obj['anuswer'] = q.row.find((r: { value: any; }) => r.value == q.selected[0].rowValue);
        this.finalQuestionLIst.push(obj);
      }
    })
  }

  exitEvent(isBackAction: boolean) {
   const message = this.translate.instant('deviceInformation.success');
    if (this.houseHold) {
      this.router.navigate(['demographics/Thankyou'], { state: { message: message,  inputRoute: "demographics-owner"} });
    }
    else {
      this.router.navigate(['demographics/Thankyou'], { state: {message: message, inputRoute: "demographics-individual" } });
    }
  }

  goToLastPage() {
    this.isReview = false;
    this.markCompleteEvent.emit({ isBack: true });
  }
}
