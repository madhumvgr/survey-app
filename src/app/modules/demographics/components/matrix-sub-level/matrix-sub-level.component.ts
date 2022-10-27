import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';


@Component({
  selector: 'app-matrix-sub-level',
  templateUrl: './matrix-sub-level.component.html',
  styleUrls: ['./matrix-sub-level.component.css']
})
export class MatrixSubLevelComponent implements OnChanges {

  @Input() question!: Question;
  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  //@Input() question!: Question;
  @Input() houseHold: any;
  @Input() questionId: any;
  cols: Column[] = [];
  isFrance: any = false;
  buttonClicked: any = false;
  urlPage:any;
  @Input()
  pageButtonClicked:any;
  @Input()
  isButtonPressed!: FormGroup;
  @Input() newPage:any;
  constructor(private localStorageService: LocalStorageService,  public questionaireService: QuestionaireService) {
    this.localStorageService.getLanguageSubject().subscribe(val => {
      this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    });
  }
  @Output()
  public changeEvent1 = new EventEmitter();

  ngOnInit(): void {
    this.questionaireService.quersionSubjectRecevier$$.subscribe((res:any)=>{
      this.buttonClicked = res
    })
    this.urlPage=window.location.href.split('/').pop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    var groupedCols = this.groupBy(this.question.column);
    if (groupedCols) {
      this.cols = groupedCols[Object.keys(groupedCols)[0]];
    }

    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      // let selected = this.question.selected;
      let prevValue = { rowValue: '', colValue: '', answer: '' }
      // if (selected) {
      //   prevValue = selected[selected.length-1];
      // }
      if (this.question?.row && this.question.subSurveyQueAnsDTO) {
        this.question.subSurveyQueAnsDTO.forEach(subQues => {
          if (subQues.selected && subQues.selected.length != 0) {
            if( subQues?.queType != "RB") {
              let value = subQues.selected[0].answer;
              if(subQues.mandatory && !subQues.disabled){
                this.childFormGroup.addControl('' + subQues?.queId, new FormControl(value, Validators.required));
              }
              else{
                this.childFormGroup.addControl('' + subQues?.queId, new FormControl(value));
              }
             
            } else{
              this.childFormGroup.addControl('' + subQues?.queId, new FormControl(subQues.selected[0].rowValue));
            }
            
          }
          else {
            if(subQues.mandatory && !subQues.disabled){
              this.childFormGroup.addControl('' + subQues?.queId, new FormControl('',Validators.required));
            }else{
              this.childFormGroup.addControl('' + subQues?.queId, new FormControl(''));
            }
          }
          if (subQues.subSurveyQueAnsDTO) {
            let subAnswer : any;
            subQues?.selected?.forEach((value:any) => {
              subAnswer = value.answer
            })
            console.log(subAnswer);
            let sub2LevQues = subQues.subSurveyQueAnsDTO;
            sub2LevQues.forEach(sub2Lev => {
              
              if (sub2Lev.selected && sub2Lev.selected.length != 0) {
                let sub2LevAns = sub2Lev.selected[0].answer;
                if (sub2Lev.queType == 'TEXT') {
                  sub2LevAns = sub2Lev.selected[0].otherDesc;
                } else {
                  sub2LevAns = sub2Lev.selected[0].rowValue;
                }
                if(subQues.mandatory && !subQues.disabled){
                  this.childFormGroup.addControl('' + subQues?.queId, new FormControl(''));
                }else{
                  this.childFormGroup.addControl('' + subQues?.queId, new FormControl(''));
                }

                if(sub2Lev.mandatory && !subQues.disabled){
                  this.childFormGroup.addControl('' + subQues?.queId + '' + sub2Lev.queId, new FormControl(sub2LevAns,Validators.required))
                }else{
                  this.childFormGroup.addControl('' + subQues?.queId + '' + sub2Lev.queId, new FormControl(sub2LevAns? sub2LevAns : ''))
                }
                
              } else {
                if( subQues.mandatory && sub2Lev.mandatory && !subQues.disabled && subAnswer != 'N'){
                  this.childFormGroup.addControl('' + subQues?.queId + '' + sub2Lev.queId, new FormControl('',Validators.required))
                }else{
                  this.childFormGroup.addControl('' + subQues?.queId + '' + sub2Lev.queId, new FormControl(''))
                }
              }
            })
          }


        })
      }
      this.parentForm.addControl('' + this.question?.queId, this.childFormGroup);
      this.onlyOnce = true;
    }
  }
  getPrevSelectedValue(selected: any[] | undefined, value: any, colValue: any) {
    if (selected) {
      return selected.find(sel => sel.rowValue === value && sel.colValue === colValue);
    }
  }

  childFormControl(queId: any) {
    return this.childFormGroup.controls[queId];
  }

  groupBy(objectArray: any) {
    return objectArray.reduce((acc: any, obj: any) => {
      var key = obj['rowValue'];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  changeEvent(value: any, isText: boolean, isLevel1: boolean, isLevel: boolean, subQuesId: any, condId?: any, type?: any, skip?: string) {
    let questionNo;
    if (this.question?.queNo) {
      questionNo = this.question?.queNo;
    } else {
      questionNo = this.question?.queId;
    }
    const firstControl = this.childFormGroup.controls[subQuesId + '1'];
    const secoundControl = this.childFormGroup.get(subQuesId + '2');
    if (this.childFormGroup.controls[subQuesId].value == 'Y') {
      if (firstControl) {
        firstControl?.setValidators([Validators.required]);
        firstControl?.updateValueAndValidity()
      }
      if (secoundControl) {
        secoundControl?.setValidators([Validators.required]);
        secoundControl?.updateValueAndValidity()
      }
    } else if (this.childFormGroup.controls[subQuesId].value == 'N') {
      if (firstControl) {
        firstControl?.setValidators([Validators.required]);
        firstControl?.updateValueAndValidity()
      }
      if (secoundControl) {
        secoundControl?.setValidators([Validators.required]);
        secoundControl?.updateValueAndValidity()
      }
    }
    if (isLevel) {
      this.parentForm.get('' + questionNo)?.get('' + questionNo)?.setValue(value);
      this.question.queId = subQuesId;
      if(type == "YES-NO-CY") {
        this.question.answer = value;
        this.question.questionLevel1Id = null;
        this.question.skip= skip;
       // this.childFormGroup.removeControl('otherDescription');
      const subLevel = this.question.subSurveyQueAnsDTO?.find((r: any) => r.queId == subQuesId);
      if(subLevel?.subSurveyQueAnsDTO && value == 'N') {
        subLevel?.subSurveyQueAnsDTO.forEach((que: any)=> {
          if(que.mandatory) {
            this.childFormGroup.removeControl('' + subLevel?.queId + '' + que.queId);
            this.parentForm.addControl('' + this.question?.queId, this.childFormGroup);
      }
        } )
      } else if(subLevel?.subSurveyQueAnsDTO && value == 'Y'){
        subLevel?.subSurveyQueAnsDTO.forEach((que: any)=> {
          if(que.mandatory) {
            this.childFormGroup.addControl('' + subLevel?.queId + '' + que.queId, new FormControl('',Validators.required));
        //    this.childFormGroup.removeControl('' + subLevel?.queId + '' + que.queId);
            this.parentForm.addControl('' + this.question?.queId, this.childFormGroup);
          }
      });

      }
      //  this.childFormGroup.removeControl('' + subQues?.queId + '' + sub2Lev.queId)
      } else {
        this.question.answer = "Y";
        this.question.questionLevel1Id = value;
      }

      this.question.condQuestionId = parseInt("");
      this.question.queType = "";
      this.question.condQuestionLevel1Id = null;
      this.question.condQuestionLevel2Id = null;
      this.question.condAnswer = "";
      this.question.condQueType = "";
      this.question.condMaxLevel = "1";
      this.question.condOtherDescription = "";
      this.question.extraCond = type;
    } else if (isLevel1) {
      this.parentForm.get('' + questionNo)?.get('' + questionNo)?.setValue(value);
      this.question.queId = subQuesId;
      this.question.condQuestionId = condId;
      this.question.queType = ""
      this.question.condQuestionLevel1Id = value;
      this.question.condQuestionLevel2Id = null;
      this.question.answer = "Y";
      this.question.condAnswer = "Y";
      this.question.condQueType = "RB";
      this.question.condMaxLevel = "1";
      this.question.condOtherDescription = "";
      this.question.extraCond = type;
    } else if (isText) {
      this.parentForm.get('' + questionNo)?.get('' + questionNo)?.setValue(value);
      this.question.queId = subQuesId;
      this.question.condQuestionId = condId;
      this.question.queType = ""
      this.question.answer = "Y";
      this.question.condQuestionLevel1Id = null;
      this.question.condQuestionLevel2Id = null;
      this.question.condAnswer = "Y";
      this.question.condQueType = "TEXT";
      this.question.condMaxLevel = "1";
      this.question.condOtherDescription = value.target.value;
      this.question.extraCond = "YES-NO-CY";
    }
    this.changeEvent1.emit(this.question);
  }
}
export class Column {
  value!: number;
  description!: string;
  rowValue!: number;
  seqNo!: number;
  text!: string;
}