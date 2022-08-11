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
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

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
  memberName: any;
  houseHold: boolean = false;
  panelistType: any;
  totalNoPages: any;
  pageNo: any;
  isReviewPage: boolean = false;
  userType = localStorage.panellistType;

  constructor(public questionaireService: QuestionaireService, private translate: TranslateService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private localStorageService: LocalStorageService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
    this.memberName = this.localStorageService.getItem(StorageItem.INDIVIDUALNAME);
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params['page'];

    });
    this.memberNo = this.route.snapshot.params['memberNo'];
    this.pageNo = this.route.snapshot.params['pageNo'];
    this.homeNo = this.route.snapshot.params['homeNo'];
    this.houseHold = this.route.snapshot.params['houseHold'];
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.pageNo = params['pageNo'];
    })
    this.panelistType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
    // household owner 
    //SSP
    if (this.houseHold) {
      if(this.panelistType != "VAM") {
      this.questionaireService.customRead(QuestionConstants.houseHoldQuestions + '/' + this.memberNo).subscribe(list => {
        const questions = list;
        this.questionList =  questions.filter( (item: any) =>item.disabled === false);
        this.totalNoPages = Math.ceil((this.questionList.length)/2)
      })
    }
      //household owner
      //VAM
      else{
        this.questionaireService.customRead(QuestionConstants.vam_houseHoldQuestions + '/' + this.memberNo).subscribe(list => {
        const questions = list;
        this.questionList =  questions.filter( (item: any) =>item.disabled === false);
          this.totalNoPages = Math.ceil((this.questionList.length)/2)
        })
      }
      //individual 
      //SSP
    } else if( this.houseHold == undefined && this.panelistType != "VAM") {
      this.questionaireService.customRead(QuestionConstants.questionaire + '/' + this.memberNo).subscribe(list => {
        const questions = list;
        this.questionList =  questions.filter( (item: any) =>item.disabled === false);
        this.totalNoPages = Math.ceil((this.questionList.length)/2)
      });
      //individual
      //vam
    } else {
      this.questionaireService.customRead(QuestionConstants.vam_questionaire +'/'+ this.memberNo).subscribe(list => {
        const questions = list;
        this.questionList =  questions.filter( (item: any) =>item.disabled === false);
        this.totalNoPages = Math.ceil((this.questionList.length)/2)
      })
    }
  }

  markCompleteEvent(event: any) {
    if(event.isSubmit) {
      let message = 'genres.message';
    if(this.houseHold){
      console.log(this.houseHold);
      this.questionaireService.customCreate({}, QuestionConstants.markHouseHold + this.memberNo+ '?userType=' + this.userType).subscribe(result => {
      this.router.navigate(['demographics/Thankyou'], { state: {message:message, inputRoute: "demographics-owner" } });
     });
    }else{
      this.questionaireService.customCreate({}, QuestionConstants.markSurveyCompleted + this.memberNo+ '?userType=' + this.userType).subscribe(result => {
      this.router.navigate(['demographics/Thankyou'], { state: {message:message, inputRoute: "demographics-individual" } });
      });
    }
  } else {
    this.isReviewPage = !event.isBack;
  }
  }

}