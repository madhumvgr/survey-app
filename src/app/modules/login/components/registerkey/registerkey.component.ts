import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from 'src/app/shared/models/url-constants';
import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registerkey',
  templateUrl: './registerkey.component.html',
  styleUrls: ['./registerkey.component.css']
})
export class RegisterkeyComponent implements OnInit {
  hide= true;
  model: any = {};
  password: any;
  showOtpError =false;

  constructor(private router: Router,private userService: UserService) { }

  ngOnInit(): void {
  }

  navToRegister() {
    this.hide=true;
    // validate otp in backend. 
    const url = UrlConstants.registerKeyForOtp+'/'+this.model.password
    this.userService.customRead(url).subscribe( response => {
      if(response.id){
        this.showOtpError=false;
        localStorage.setItem("profileId",response['portalHome'] ['homeNo']);
        this.router.navigate(['login/register']);
      }
      else{
        this.showOtpError=true;
      }
    },err => this.showOtpError=true,
    () => this.showOtpError=true);
  }

  onSubmit() {
    this.navToRegister();
  }
}
