import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Info } from 'src/app/models/info.model';

@Component({
	selector: 'app-event-dialog',
	templateUrl: './event-dialog.component.html',
	styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: Info, public ref: MatDialogRef<EventDialogComponent>) { }

}
