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
  currentPage: any;

  constructor(public questionaireService: QuestionaireService, private translate: TranslateService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private localStorageService: LocalStorageService) {
    super();
    this.config = {
      currentPage: 1,
      itemsPerPage: 6
    };

    this.config.currentPage = +this.route.snapshot.params['pageNo'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parentForm = this.toFormGroup(this.questionList);
  }

  ngOnInit(): void {
    // this.panelListType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
    this.panelListType = "SSP";
  }


  ngAfterViewInit() {
    super.afterViewInit(this.modalComponent);
  }


  pageChange(newPage: any) {
    this.currentPage = newPage;
    this.questionaireService.SetQuestionValid(true);
    if( (newPage < this.config.currentPage)) {
      this. redirect();
    }
    else if (this.parentForm.valid) {
      Object.keys(this.parentForm.controls).forEach(key => {
        const questionControl = this.parentForm.controls[key];
        if(questionControl.valid) {
          const keys = Object.keys(questionControl.value);
          const selectedQuestion = this.questionList.find(q=> q.queNo == keys[0] || q.queId == keys[0]);
          if(selectedQuestion) {
          selectedQuestion.questionLevel1Id = questionControl.value[keys[0]];
          selectedQuestion.otherDescription = questionControl.value[keys[1]];
          this.changeEvent(selectedQuestion);
          }
        }
      });
    }
  }

  createQuestion(): FormGroup {

    return this.fb.group({
      name: [null, Validators.required]
    })
  }

  changeEvent(question: any) {

    let obj: any = {
    }
    obj['questionId'] = question.queId;
    obj['queType'] = question.queType;
    obj['questionLevel1Id'] = question.questionLevel1Id;
    obj['questionLevel2Id'] = question.questionLevel2Id;
    obj['answer'] = question?.answer;
    obj['memberNo'] = this.memberNo;
    obj['maxLevel'] = question.maxLevel;
    obj['otherDescription'] = question.otherDescription;

    if (this.houseHold && this.panelListType != "VAM") {
      this.questionaireService.customCreate(obj, QuestionConstants.houseHoldAnswers).subscribe(data => {
        this.redirect();
      });
    } else if (this.houseHold == undefined && this.panelListType != "VAM") {
      this.questionaireService.customCreate(obj, QuestionConstants.answers).subscribe(data => {
        this.redirect();
      });
    } else if (this.houseHold == undefined && this.panelListType == "VAM") {
      this.questionaireService.customCreate(obj, QuestionConstants.vam_answers).subscribe(data => {
        this.redirect();
      });
    } else {
      this.questionaireService.customCreate(obj, QuestionConstants.vam_houseHoldAnswers).subscribe(data => {
        this.redirect();
      });
    }
  }

  redirect() {
    if(this.config.currentPage != this.currentPage) {   
    this.config.currentPage = this.currentPage;
    if (this.houseHold) {
      this.router.navigate(['/demographics/questionaire/true/' + this.memberNo + '/' + this.currentPage + '/true']).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate(['/demographics/questionaire/' + this.memberNo + '/' + this.homeNo + '/' + this.currentPage]).then(() => {
        window.location.reload();
      });
    }
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
    this.pageChange(this.config.currentPage);
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
        const obj: any = { hhQueNo: q.hhQueNo, queNo: q.queNo, title: q.title, titleFr: q.titleFr, answer: {} };
        if(q.selected[0].otherDesc) {
          obj['answer'] = {text : q.selected[0].otherDesc}
        } else {
        obj['answer'] = q.row.find((r: { value: any; }) => r.value == q.selected[0].rowValue);
        }
        if(obj['answer']) {
        this.finalQuestionLIst.push(obj);
        }
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
