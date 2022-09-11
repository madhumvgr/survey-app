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
  childFormGroup!: FormGroup;
  onlyOnce = false;
  isFrance: any = false;
  ShowInput: boolean = false;
  displayError: boolean = false;
  @Input() question!: any;
  @Input() houseHold: any;
  panelListType: any;
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
      this.buttonClicked = res
    })
    this.panelListType = this.localStorageService.getItem(StorageItem.PANELLISTTYPE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    if (!this.onlyOnce && this.question) {
      this.childFormGroup = new FormGroup({
      });
      //set selected value into childForm
      let selected = this.question.selected;
      let prevValue = { rowValue: '', otherDesc: '' }
      if (selected && selected.length) {
        console.log(this.question);
        prevValue = selected[selected.length - 1];
      }
      let questionNo;
      if (this.question?.queNo) {
        questionNo = this.question?.queNo;
      } else {
        questionNo = this.question?.queId;
      }
      const otherRow = this.question.row[this.question.row.length - 1];
      if (this.question?.mandatory) {
        this.childFormGroup.addControl('' + questionNo, new FormControl(prevValue ? prevValue?.rowValue : '', Validators.required));
        if (prevValue.otherDesc) {
          const otherRow = this.question.row[this.question.row.length - 1];
          this.childFormGroup.addControl('otherDescription', new FormControl(otherRow ? otherRow?.value : '', Validators.required));
          this.ShowInput = otherRow && otherRow.flag ? true : false;
        } else {
          const lastRow = this.question.row.filter((x: any) => x.value == prevValue.rowValue)
          if (lastRow && lastRow[0] && lastRow[0].text) {
            if (lastRow[0].text == "Other" || lastRow[0].text == "Other Occupation (Please specify)" || lastRow[0].text == "Other Industry (please specify)") {
              this.ShowInput = true;
              //  this.childFormGroup.addControl('' + questionNo, new FormControl(prevValue?prevValue?.rowValue:''));
              this.childFormGroup.addControl('otherDescription', new FormControl(prevValue ? prevValue?.otherDesc : '', Validators.required));
            } else {
              this.childFormGroup.addControl('' + questionNo, new FormControl(prevValue ? prevValue?.rowValue : ''));
            }
          } else {
            this.childFormGroup.addControl('' + questionNo, new FormControl(prevValue ? prevValue?.rowValue : ''));

          }
        }
      } else {
        const lastRow = this.question.row.filter((x: any) => x.value == prevValue.rowValue);
        if (lastRow.length > 0) {
          if (lastRow[0].text == "Other") {

            this.ShowInput = true;
          }
        }
        this.childFormGroup.addControl('' + questionNo, new FormControl(prevValue ? prevValue?.rowValue : ''));
      }
      if(this.question?.mandatory){
        this.childFormGroup.addControl('otherDescription', new FormControl(prevValue ? prevValue?.otherDesc : '', Validators.required));
      }else{
        this.childFormGroup.addControl('otherDescription', new FormControl(prevValue ? prevValue?.otherDesc : ''));
      }
      
      this.parentForm.addControl('' + questionNo, this.childFormGroup);
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
      //   this.childFormGroup.addControl('otherDescription', new FormControl(desc?desc:''));
    } else {
      this.displayError = true;
      //  this.childFormGroup.addControl('otherDescription' , new FormControl(desc?desc:'', Validators.required));
      this.changeEvent(value, event, skip, desc);
    }
  }
}

