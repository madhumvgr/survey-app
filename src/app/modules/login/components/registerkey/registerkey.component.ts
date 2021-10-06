import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registerkey',
  templateUrl: './registerkey.component.html',
  styleUrls: ['./registerkey.component.css']
})
export class RegisterkeyComponent implements OnInit {

  model: any = {};
  password: any;
  showOtpError =false;

  constructor(private router: Router,private userService: UserService) { }

  ngOnInit(): void {
  }

  navToRegister() {
    // validate otp in backend. 
    this.userService.customRead(this.model.password).subscribe( response => {
      if(response.id)
      this.router.navigate(['login/register']);
      else
      this.showOtpError =true;
    })
    
  }

  onSubmit() {
    this.navToRegister();

  }

}
