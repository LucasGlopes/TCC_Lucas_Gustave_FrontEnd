import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDialogComponent } from '../components/user-dialog/user-dialog.component';


@Injectable({
	providedIn: 'root'
})
export class NotificationService {

    constructor(
        private _snackBar: MatSnackBar,
        private dialog: MatDialog
    ){}

    openErrorSnackBar(msg: string){
        this._snackBar.open(msg, 'X', {
            duration: 3000,
            panelClass: ['red-snackbar'],
        });

    }

    openSuccessSnackBar(msg: string){
        return this._snackBar.open(msg, 'X', {
            duration: 3000,
            panelClass: ['green-snackbar'],
        });
    }

    openDeleteDialog(msg: string) {
        return this.dialog.open(UserDialogComponent, {
            autoFocus: false,
            data: {msg}
        });
    }
}

