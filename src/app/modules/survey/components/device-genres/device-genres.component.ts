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
  constructor(public Activatedroute: ActivatedRoute,public router: Router, public matDialog:MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.deviceId = this.Activatedroute.snapshot.params['deviceId'];
    this.deviceState = this.Activatedroute.snapshot.params['state'];
  }
  continueNavigate() {
    //  this.router.navigateByUrl('survey/deviceUsage/'+this.deviceState+'/'+this.deviceType);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { name: "some name"};
    let dialogRef =  this.matDialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((value: any) => {
      console.log(`Dialog sent: ${value}`); 
      alert(value);
    });
  }


}
