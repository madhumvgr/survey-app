import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completed-devices-view',
  templateUrl: './completed-devices-view.component.html',
  styleUrls: ['./completed-devices-view.component.css']
})
export class CompletedDevicesViewComponent implements OnInit {
  deviceState: string = '';
  deviceId: string  = '';

  constructor(private Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
   // this.deviceState = "Completed";
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }

}
