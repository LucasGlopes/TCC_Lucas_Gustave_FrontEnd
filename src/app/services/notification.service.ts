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

    openDeleteDialog() {
        return this.dialog.open(UserDialog, {
            autoFocus: false
        });
    }
}


@Component({
    selector: 'dialog-elements-example-dialog',
    template: `
        <h1 mat-dialog-title>Você tem certeza?</h1>
        <div mat-dialog-content>
            <p>Sua conta será permanentemente deletada.</p>
        </div>
        <div mat-dialog-actions class="container">
            <button 
                mat-stroked-button 
                class="cancel"
                (click)="onCancel()"
            >
                Cancelar
            </button>
            <button 
                mat-flat-button 
                color="warn" 
                (click)="onConfirm()"
            >
                Deletar
            </button>
            
        </div>
    `,
    styles: [`
        .container{
            width: 100%;
            display: flex;
            justify-content: center;
        }
    `]
})
export class UserDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public ref: MatDialogRef<UserDialog>) { }

    onCancel(): void {
        this.ref.close(false);
    }

    onConfirm(){
        this.ref.close(true);
    }
}