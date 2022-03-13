import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/modules/login/model/question.model';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
@Component({

  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnChanges {
  @Input()
  parentForm!: FormGroup;
  childFormGroup!: FormGroup;
  onlyOnce = false;
  formArray: number[] = [];

  @Input() question!: Question;
  @Output()
  public changeEvent1 = new EventEmitter();
  orderControl1: any[] = [];
  isFrance: any = false;
  constructor(  private localStorageService:LocalStorageService,public fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.isFrance = this.localStorageService.getItem(StorageItem.LANG) === "fr";
    if (!this.onlyOnce && this.question) {
     // let selected = this.question.selected;
      if (this.question.row) {
        const controlArray = this.question.row.map(c => {
          let isMatch = false
          if (this.question.selected) {
            this.question.selected.forEach(sel => {
              if (sel.rowValue === c.value) isMatch = true;
            });
          }
          return new FormControl(isMatch);
        });
        this.childFormGroup = this.fb.group({
          checkboxes: this.fb.array(controlArray)
        })
      }
    }
    // const checkboxes = <FormGroup>this.childFormGroup.get('checkboxes');
    // if (this.question.selected) {
    //   this.question.selected.forEach((option: any) => {
    //     checkboxes.addControl(option.row, new FormControl(true));
    //   });
    // }

    // let selected = this.question.selected;

    // let prevValue = { rowValue: '' }
    // if (selected) {
    //   prevValue = selected[selected.length - 1];
    // }
    // if (this.question?.mandatory && prevValue) {
    //   if (this.childFormGroup.get('checkboxes')) {
    //     this.childFormGroup.get('checkboxes')?.setValue([prevValue.rowValue]);
    //   }
    //   this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(prevValue?.rowValue, Validators.required));
    // } else {
    //   if (prevValue && prevValue.rowValue)
    //     this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(prevValue?.rowValue));
    //   else {
    //     this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''))
    //   }
    // }
    this.parentForm.addControl('' + this.question?.queNo, this.childFormGroup);
    //this.childFormGroup.addControl('' + this.question?.queNo, new FormControl(''));
    this.onlyOnce = true;

  }
  get orderControl() {
    if (this.childFormGroup?.get('checkboxes')) {
      return (this.childFormGroup?.get('checkboxes') as FormArray).controls;
    }
    return [];
  }

  changeEvent(event: any) {

    // const selectedOrderIds = this.childFormGroup.value.orders
    //   .map((v: any, i: number) => v ? this.orders[i].id : null)
    //   .filter((v: null) => v !== null);

    // console.log(selectedOrderIds);
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      this.question.answer = "Y";
      this.formArray.push(event.target.value);
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;
      this.question.answer = "N";
      this.formArray.forEach((ctrl: any) => {
        if (ctrl == event.target.value) {
          // Remove the unselected element from the arrayForm
          this.formArray.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.parentForm.get('' + this.question?.queNo)?.get('' + this.question.queNo)?.setValue('Y');
    //this.question.answer = this.formArray;
    this.question.questionLevel1Id = parseInt(event.target.value);
    this.question.questionLevel2Id = null;
    this.changeEvent1.emit(this.question);
  }
}
