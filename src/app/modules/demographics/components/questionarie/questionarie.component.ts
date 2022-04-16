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
  constructor(public questionaireService: QuestionaireService,
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
    this.homeNo = this.route.snapshot.params['homeNo'];
    this.houseHold = this.route.snapshot.params['houseHold'];
    
  }

  ngOnInit(): void {
    this.panelistType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);

    if (this.houseHold) {
      this.questionaireService.customRead(QuestionConstants.houseHoldQuestions).subscribe(list => {
        this.questionList = list;
      })
    } else if(this.panelistType != "VAM") {
      this.questionaireService.list().subscribe(response => {
        this.questionList = response;
      });
    } else{
      this.questionaireService.customRead(QuestionConstants.vam_questionaire).subscribe(list => {
        this.questionList = list;
      })
    }
  }

  markCompleteEvent(event: any) {
    if(this.houseHold){
      this.questionaireService.customCreate({}, QuestionConstants.markHouseHold + this.memberNo).subscribe(result => {
        this.router.navigate(['/account-settings/thankyou/questionarie'], { state: { message: "You have successfully submitted  survey. " } });
      });
    }else{
      this.questionaireService.customCreate({}, QuestionConstants.markSurveyCompleted + this.memberNo).subscribe(result => {
        this.router.navigate(['/account-settings/thankyou/questionarie'], { state: { message: "You have successfully submitted  survey. " } });
      });
    }
  }
}
