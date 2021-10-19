import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogComponent } from "src/app/modules/material/components/dialog/dialog.component";

export class BaseComponent {
    constructor(public matDialog: MatDialog) {
    }
    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { name: "some name" };
        let dialogRef = this.matDialog.open(DialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((value: any) => {
            console.log(`Dialog sent: ${value}`);
        });
    }
}