import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';


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

    openDialog(name: string) {
        this.dialog.open(UserDialog, {data: {name}});
    }
}


@Component({
    selector: 'dialog-elements-example-dialog',
    template: `
        <h1 mat-dialog-title>Olá, {{data.name}}!</h1>
        <div mat-dialog-content>
            <p>Seja bem-vindo(a) ao Plaso!</p>
        </div>
        <div mat-dialog-actions>
            <button 
                mat-raised-button 
                color="primary"  
            >
                Começar
            </button>
            
        </div>
    `
})
export class UserDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public ref: MatDialogRef<UserDialog>) { }

}