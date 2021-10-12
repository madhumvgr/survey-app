import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-multi-user-list',
  templateUrl: './multi-user-list.component.html',
  styleUrls: ['./multi-user-list.component.css']
})
export class MultiUserListComponent implements OnInit {

  deviceType : any;
  deviceState: any;
  constructor(private Activatedroute:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.deviceType = this.Activatedroute.snapshot.params['type'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }
  continueNavigate(){
    this.router.navigateByUrl('survey/deviceUsage/'+this.deviceState+'/'+this.deviceType);
  }


}
