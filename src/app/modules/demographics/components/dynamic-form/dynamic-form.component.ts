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
  isQuestion!: boolean;
  isVamOpenModal = false;
  isCancelClicked = false;

  localmodalConfig = {
  isBackAction: true  
  }
  newPage: any;

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
    this.newPage =newPage;
    if (this.panelListType == "VAM" && (this.newPage > this.config.currentPage)) {
      let formNotTouched = false;
      Object.keys(this.parentForm.controls).forEach(key => {
        if(!this.parentForm.controls[key].value[key]){
          formNotTouched = true
        }
      });
      if(formNotTouched && !this.isCancelClicked) {
        this.isVamOpenModal = true;
        this.isCancelClicked = false;
        this.openModal();
       this.localmodalConfig = {
          isBackAction: false
          }
      } else {
        this.redirect();
      }
    } else {
      this.redirect();
    }
   
  }

  redirect() {
    this.questionaireService.SetQuestionValid(true)
    if (this.parentForm.valid || (this.newPage < this.config.currentPage)) {
      this.config.currentPage = this.newPage;
      //this.router.navigate(['/demographics/questionaire/'+this.memberNo+'/'+this.homeNo], { queryParams: { page: newPage } });
      if (this.houseHold) {
        this.router.navigate(['/demographics/questionaire/true/' + this.memberNo + '/' + this.newPage + '/true']).then(() => {
          window.location.reload();
        });
      } else {
        this.router.navigate(['/demographics/questionaire/' + this.memberNo + '/' + this.homeNo + '/' + this.newPage]).then(() => {
          window.location.reload();
      
        });
      }
    }
  }

  // reload() {
  //   if (this.parentForm.valid ) {
  //     const panelistType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
  //     if (this.houseHold) {
  //       if (panelistType != "VAM") {
  //         this.questionaireService.customRead(QuestionConstants.houseHoldQuestions + '/' + this.memberNo).subscribe(list => {
  //           this.questionList = list;
  //         })
  //       }
  //       else {
  //         this.questionaireService.customRead(QuestionConstants.vam_houseHoldQuestions + '/' + this.memberNo).subscribe(list => {
  //           this.questionList = list;
  //         })
  //       }
  //     } else if (this.houseHold == undefined && panelistType != "VAM") {
  //       this.questionaireService.customRead(QuestionConstants.questionaire + '/' + this.memberNo).subscribe(list => {
  //         this.questionList = list;

  //       });
  //     } else {
  //       this.questionaireService.customRead(QuestionConstants.vam_questionaire + '/' + this.memberNo).subscribe(list => {
  //         this.questionList = list;
  //       })
  //     }
  //   }
  // }

  createQuestion(): FormGroup {

    return this.fb.group({
      name: [null, Validators.required]
    })
  }

  changeEvent(question: any) {
    console.log(question);

    let obj: any = {
    }
    if (this.houseHold && this.panelListType != "VAM") {
      if (!question.queType) {
        obj['queType'] = question?.extraCond;
      } else {
        obj['queType'] = question.queType;
      }
      obj['questionId'] = question.queId;
      obj['questionLevel1Id'] = question?.questionLevel1Id;
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
      // obj['condQuestionId'] = question.condQuestionId;
      // obj['condQuestionLevel1Id'] = question.condQuestionLevel1Id;
      //   obj['condQuestionLevel2Id'] = question.condQuestionLevel2Id;
      //   obj['condAnswer'] = question.condAnswer;
      //   obj['condQueType'] = question.condQueType;
      //   obj['condMaxLevel'] = question.condMaxLevel;
      //   obj['condOtherDescription'] = question.condOtherDescription;
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
  this.isCancelClicked = true;
    console.log(isBackAction);
  }

  submit() {
    this.markCompleteEvent.emit({ isSubmit: true });
  }

  review() {
    this.questionaireService.SetQuestionValid(true)
    this.markCompleteEvent.emit({ isBack: false });
    if (this.parentForm.valid) {
      const panelistType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);

      if (this.houseHold) {
        if (panelistType != "VAM") {
          this.questionaireService.customRead(QuestionConstants.houseHoldQuestions + '/' + this.memberNo).subscribe(list => {
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
        this.questionaireService.customRead(QuestionConstants.questionaire + '/' + this.memberNo).subscribe(list => {
          this.questionList = list;
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
      if (q.type != "matrix-subquestion") {
        const obj: any = { hhQueNo: q.hhQueNo, queNo: q.queNo, title: q.title, titleFr: q.titleFr, answer: {}, type:q.type };
        
        if (q.queType == "RB") {
          if (q.maxLevel == '1') {
            if (q.selected[0]?.otherDesc) {
              obj['answer'] = { text: q.selected[0]?.otherDesc }
            } else {
              obj['answer'] = q.row.find((r: { value: any; }) => r.value == q.selected[0]?.rowValue);
            }
          }
          if (q.maxLevel == '2') {
            obj['answer'] = []
            q.selected.forEach((s: any) => {
              const row = q.row.find((r: any) => r.value == s.rowValue)
              const col = q.column.find((c: any) => c.value == s.colValue)
              obj['answer'].push({ text: row.text, answer: col.text })
            })
          }
        }
        if (q.queType == "YES-NO") {
          if (q.maxLevel == '0') {
            obj['answer'] = { text: q.selected[0].answer == 'Y' ? 'Yes' : 'No' }
          }
          if (q.maxLevel == '1') {
            obj['answer'] = []
            q.selected.forEach((s: any) => {
              const row = q.row.find((r: any) => r.value == s.rowValue)
              obj['answer'].push({ text: row.text, answer: s.answer == 'Y' ? 'Yes' : 'No' })
            })
          }
          if (q.maxLevel == '2') {
            obj['answer'] = []
            q.selected.forEach((s: any) => {
              const row = q.row.find((r: any) => r.value == s.rowValue)
              const col = q.column.find((c: any) => c.value == s.colValue)
              obj['answer'].push({ text: row.text, test1: col.text, answer: s.answer == 'Y' ? 'Yes' : 'No' })
            })
          }
        }
        if (q.queType == "TEXT") {
          obj['answer'] = { text: q.selected[0].otherDesc }
        }
        if (q.queType == "''") {
          obj['answer'] = { text: "test-q6" }
        }
        if (obj['answer']) {
          this.finalQuestionLIst.push(obj);
        }
      }
      if (q.type == "matrix-subquestion") {
        const obj: any = { hhQueNo: q.hhQueNo, queNo: q.queNo, title: q.title,
           titleFr: q.titleFr, answer: {}, type:q.type, subSurveyQueAnsDTO: [] };
           
           q.subSurveyQueAnsDTO.forEach((element:any) => {
            const answer = element.selected[0].answer == 'N' ? 'No' : 'Yes';
            const arr: { title: any; answer: any; }[] = [];
            if(answer == 'Yes' &&  element.subSurveyQueAnsDTO.length) {
              element.subSurveyQueAnsDTO.forEach((e:any) => {
                if(e.selected.length) {
                  const temp = e.queType == "TEXT" ? e.selected[0].otherDesc :
                   e.row.find((r: any) => r.value == e.selected[0].rowValue).text;
                  arr.push({title : e.title, answer : temp})
                }
              });
            }
            const obj1: any = {hhQueNo: element.hhQueNo, queNo: element.queNo, title: element.title,
              titleFr: element.titleFr, answer: answer, subSurveyQueAnsDTO: element.subSurveyQueAnsDTO}
              obj1.subSurveyQueAnsDTO['subQuestions'] =arr;
             obj.subSurveyQueAnsDTO.push(obj1)
           });
           this.finalQuestionLIst.push(obj);
      }
    })
  }

  exitEvent(isBackAction: boolean) {
    if(isBackAction) {
    const message = this.translate.instant('deviceInformation.success');
    if (this.houseHold) {
      this.router.navigate(['demographics/Thankyou'], { state: { message: message, inputRoute: "demographics-owner" } });
    }
    else {
      this.router.navigate(['demographics/Thankyou'], { state: { message: message, inputRoute: "demographics-individual" } });
    }
  }
  else {
    this.redirect();
  }
  }

  goToLastPage() {
    this.isReview = false;
    this.markCompleteEvent.emit({ isBack: true });
  }
  saveContiune() {
    this.isVamOpenModal = false;
    this.openModal();
    this.localmodalConfig = {
      isBackAction: true
      }
  }
}
