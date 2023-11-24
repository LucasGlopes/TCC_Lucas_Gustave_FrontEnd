import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public ref: MatDialogRef<UserDialogComponent>) { }

    onCancel(): void {
        this.ref.close(false);
    }

    onConfirm(){
        this.ref.close(true);
    }
}