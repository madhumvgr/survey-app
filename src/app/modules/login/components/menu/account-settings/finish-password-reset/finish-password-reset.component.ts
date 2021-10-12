import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/login/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-finish-password-reset',
  templateUrl: './finish-password-reset.component.html',
  styleUrls: ['./finish-password-reset.component.css']
})
export class FinishPasswordResetComponent implements OnInit {

  changePasswordFormControl: any;
  showError: any =true;
  router: any;

  constructor(private Activatedroute:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    let resetKey = this.Activatedroute.snapshot.params['resetKey'];
    if (resetKey) {
      let user: User = {
        resetKey: resetKey
      };
      this.userService.finishResetPassword(user).subscribe((response: any) => {
        if (response) {
          this.showError = false;
        }
      });
    }
  }

}
