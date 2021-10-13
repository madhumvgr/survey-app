import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-genres',
  templateUrl: './device-genres.component.html',
  styleUrls: ['./device-genres.component.css']
})
export class DeviceGenresComponent implements OnInit {

  deviceId : any;
  deviceState: any;
  constructor(private Activatedroute:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }
  continueNavigate(){
  //  this.router.navigateByUrl('survey/deviceUsage/'+this.deviceState+'/'+this.deviceType);
  }


}
