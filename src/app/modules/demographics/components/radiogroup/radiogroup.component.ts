import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { QuestionaireService } from '../../quersionarie.service';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html',
  styleUrls: ['./radiogroup.component.css']
})
export class RadiogroupComponent implements OnChanges {

  @Input()
  parentForm!: FormGroup;

  @Input()
  pageButtonClicked:any;

  clonePageButtonClicked:any;
  @Input()
  isButtonPressed!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  isFrance: any = false;
  ShowInput: boolean = false;
  displayError: boolean = false;
  @Input() question!: any;
  @Input() houseHold: any;

  @Input() newPage:any;
  
  urlPage:any;

  panelListType: any;
  lastRow: any;
  buttonClicked: any = false;
  constructor(private localStorageService: LocalStorageService, public questionaireService: QuestionaireService) {
    this.localStorageService.getLanguageSubject().subscribe(val => {
      this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    });
  }
  @Output()
  public changeEvent1 = new EventEmitter();
  ngOnInit(): void {
    this.questionaireService.quersionSubjectRecevier$$.subscribe((res: any) => {
      this.buttonClicked = res;
      console.log(this.buttonClicked);
    })
    this.panelListType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
    this.urlPage=window.location.href.split('/').pop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      let selected = this.question.selected;
      let prevValue ={rowValue:'',otherDesc:''}
      if(selected && selected.length){
        console.log(this.question);
         prevValue= selected[selected.length -1];
      }
      if(this.question.otherDescription) {
        prevValue.otherDesc = this.question.otherDescription;
      }
      let questionNo;
      if(this.question?.queNo){
        questionNo= this.question?.queNo;
      }else{
        questionNo= this.question?.queId;
      }
      if (this.question?.mandatory) {
        this.childFormGroup.addControl('' +questionNo , new FormControl(prevValue?prevValue?.rowValue:'', Validators.required));
        if(prevValue.otherDesc) {
         const otherRow =  this.question.row[this.question.row.length-1];
         this.childFormGroup.addControl('' +questionNo , new FormControl(otherRow?otherRow?.value:'', Validators.required));
         this.childFormGroup.addControl('otherDescription', new FormControl(prevValue ? prevValue?.otherDesc : '', Validators.required));
         this.ShowInput = otherRow && otherRow.flag ? true: false;
        } else {
          if(prevValue.rowValue) {
          const lastRow = this.question.row.filter((x: any) => x.value == prevValue.rowValue)
          if (lastRow && lastRow[0] && lastRow[0].text) {
            if (lastRow[0].text == "Other" || lastRow[0].text == "Other Occupation (Please specify)" || lastRow[0].text == "Other Industry (please specify)" || lastRow[0].text == "Other (please specify)") {
              this.ShowInput = true;
                this.childFormGroup.addControl('' + questionNo, new FormControl(prevValue?prevValue?.rowValue:'', Validators.required));
              this.childFormGroup.addControl('otherDescription', new FormControl(prevValue ? prevValue?.otherDesc : '', Validators.required));
            } else{
              this.childFormGroup.addControl('' +questionNo , new FormControl(prevValue?prevValue?.rowValue:'', Validators.required));
            }
          }
        } else {
          this.childFormGroup.addControl('' +questionNo , new FormControl(prevValue?prevValue?.rowValue:'', Validators.required));
        }
        }
      } else {
        if(prevValue.otherDesc) {
          const otherRow =  this.question.row[this.question.row.length-1];
          this.childFormGroup.addControl('' +questionNo , new FormControl(otherRow?otherRow?.value:''));
          this.childFormGroup.addControl('otherDescription', new FormControl(prevValue ? prevValue?.otherDesc : ''));
          this.ShowInput = otherRow && otherRow.flag ? true: false;
         } else {
           if(prevValue.rowValue) {
           const lastRow = this.question.row.filter((x: any) => x.value == prevValue.rowValue)
           if (lastRow && lastRow[0] && lastRow[0].text) {
             if (lastRow[0].text == "Other" || lastRow[0].text == "Other Occupation (Please specify)" || lastRow[0].text == "Other Industry (please specify)" || lastRow[0].text == "Other (please specify)") {
               this.ShowInput = true;
                 this.childFormGroup.addControl('' + questionNo, new FormControl(prevValue?prevValue?.rowValue:''));
               this.childFormGroup.addControl('otherDescription', new FormControl(prevValue ? prevValue?.otherDesc : ''));
             } else{
               this.childFormGroup.addControl('' +questionNo , new FormControl(prevValue?prevValue?.rowValue:''));
             }
           }
         } else {
           this.childFormGroup.addControl('' +questionNo , new FormControl(prevValue?prevValue?.rowValue:''));
         }
         }
        // jo  this.childFormGroup.addControl('' + questionNo, new FormControl(prevValue?prevValue?.rowValue:''));
      }
      this.parentForm.addControl(''+questionNo,this.childFormGroup);
      this.onlyOnce = true;
    }
  }

  get radioFormControl() {
    let questionNo;
    if (this.question?.queNo) {
      questionNo = this.question?.queNo;
    } else {
      questionNo = this.question?.queId;
    }
    return this.childFormGroup.controls['' + questionNo];
  }

  changeEvent(value: any, event: any, skip: any, desc?: string) {
    const selectedRow = this.question.row?.find((r: any) => r.value == value);
    this.ShowInput = selectedRow.flag ? true : false;
    let questionNo;
    if (this.question?.queNo) {
      questionNo = this.question?.queNo;
    } else {
      questionNo = this.question?.queId;
    }
     if(this.question?.mandatory && this.ShowInput && this.panelListType == 'SSP'){
      this.displayError = true;
      this.childFormGroup.addControl('otherDescription', new FormControl(desc ? desc : '', Validators.required));
    }else{
      this.displayError = false;
      if(this.panelListType == 'SSP') {
      this.childFormGroup.removeControl('otherDescription');
      } else {
        this.childFormGroup.addControl('' + questionNo, new FormControl(value ? value : ''));
      }
    }
    
    this.parentForm.get('' + questionNo)?.get('' + questionNo)?.setValue(value);
    //console.log( event.target.checked);
    this.question.answer = "Y";
    this.question.questionLevel1Id = value;
    this.question.questionLevel2Id = null;
    this.question['otherDescription'] = desc;
    this.question['skip'] = skip;
    this.changeEvent1.emit(this.question);
    //this.question.queType ="YES-NO";
    // if(!this.ShowInput) {
    // this.childFormGroup.get('otherDescription')?.setValue(null);
    // this.changeEvent1.emit(this.question);
    // }
  }

  focusOut(event: any) {
    // this.question.questionLevel1Id = null;
    console.log(event);
    //  this.childFormGroup.addControl('' +this.question.otherDesc , new FormControl(event.target.value?event.target.value:'', Validators.required));
    const value = this.question.row[this.question.row.length - 1].value;
    console.log(value);
    const skip = this.question.skip;
    const desc = event.target.value;
    if (desc) {
      this.displayError = false;
      this.changeEvent(value, event, skip, desc);
  //    this.childFormGroup.addControl('otherDescription', new FormControl(desc?desc:''));
    } else {
      this.displayError = true;
  //    this.childFormGroup.addControl('otherDescription' , new FormControl(desc?desc:'', Validators.required));
      this.changeEvent(value, event, skip, desc);
    }
  }
}

