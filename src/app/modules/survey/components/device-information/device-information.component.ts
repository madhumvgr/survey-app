import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/util/base.util';

@Component({
  selector: 'app-device-information',
  templateUrl: './device-information.component.html',
  styleUrls: ['./device-information.component.css']
})
export class DeviceInformationComponent extends BaseComponent implements OnInit {
  deviceId: any;
  deviceState: any;
  constructor(private Activatedroute: ActivatedRoute, private router: Router, public matDialog: MatDialog) {
    super(matDialog);
  }

  ngOnInit(): void {
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }
  continueNavigate() {
    this.router.navigateByUrl('survey/deviceOwnerInformation/' + this.deviceState + '/' + this.deviceId);
  }

}
