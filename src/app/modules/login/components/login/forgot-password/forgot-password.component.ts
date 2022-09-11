import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword, User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { LocalStorageService, StorageItem } from 'src/app/shared/services/local-storage.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  showError = false;
  lang: any;

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService,
    private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.lang = this.localStorageService.getItem(StorageItem.LANG)
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required]],
      lang: [this.lang, [Validators.required] ]

    }
    );
  }

  get forgotFormControl() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.lang = localStorage.lang;

    if (this.forgotForm.valid) {
      console.table(this.forgotForm.value);
      //this.router.navigate(['/login/login']);

      let forgotPassword = {
        mail: this.forgotFormControl.email.value,
        lang: this.lang
      }

      this.userService.initiateForgotPassword(forgotPassword).subscribe(response => {
        if (response) {
          this.showError = false;

        }
        this.router.navigate(['/login/reset/init']);

      },(error) => {
        this.showError = true;
      });
    }
  }

}
