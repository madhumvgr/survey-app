import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/shared/services/customvalidation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-keyhelp',
  templateUrl: './keyhelp.component.html',
  styleUrls: ['./keyhelp.component.css']
})
export class KeyhelpComponent implements OnInit {

  hide = false;
  helpForm: FormGroup = this.fb.group({});
  submitted = false;
  showInvalidError = false;
  showError = false;
 

  constructor(private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.hide = false;
    this.helpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      
    }
    );
  }

  navigateTo() {
    this.hide = true;
  }

  get helpFormControl() {
    return this.helpForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.helpForm.valid) {
      console.table(this.helpForm.value);
      let user: User = {
        username: this.helpFormControl.email.value,
        rememberMe: false
      };


      this.userService.signIn(user).subscribe((response: { [x: string]: string; }) => {
        if (response) {
          this.showError = false;
          // After successful sign in, we have to set username into localstorage
          localStorage.setItem('id_token', response['id_token']);
          localStorage.setItem('username',  this.helpFormControl.email.value);
          this.router.navigate(['/login/registerkey']);
        }
      }, (err: any) => this.showError = true,
        () => this.showError = true);

    }
  }

}
