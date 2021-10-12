import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  deviceState : any;
  constructor(private Activatedroute:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }

  navigateTo(deviceType:any){
    this.router.navigateByUrl('survey/deviceInformation/'+this.deviceState+'/'+deviceType);
  }
}
