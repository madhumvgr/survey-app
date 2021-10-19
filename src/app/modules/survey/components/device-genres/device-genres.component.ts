import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/modules/material/components/dialog/dialog.component';
import { BaseComponent } from 'src/app/shared/util/base.util';


@Component({
  selector: 'app-device-genres',
  templateUrl: './device-genres.component.html',
  styleUrls: ['./device-genres.component.css']
})
export class DeviceGenresComponent extends BaseComponent implements OnInit {

  deviceId: any;
  deviceState: any;
  constructor(public activatedroute: ActivatedRoute,public router: Router, public matDialog:MatDialog) {
    super(matDialog);
  }

  ngOnInit(): void {
    this.deviceId = this.activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.activatedroute.snapshot.params['state'];
  }
}
