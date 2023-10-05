import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Status, Vaccination } from "src/app/models/vaccination.model";

@Component({
	selector: 'vaccination-status-dialog',
	templateUrl: './status-dialog.component.html',
	styleUrls: ['./status-dialog.component.scss']
})
export class VaccinationStatusDialogComponent implements OnInit {
	statusOptions: Status[] = Object.values(Status);
	currentStatus = new FormControl();

    constructor(@Inject(MAT_DIALOG_DATA) public data: Vaccination, public ref: MatDialogRef<VaccinationStatusDialogComponent>) { }

	ngOnInit(): void {
		this.currentStatus.setValue(this.data.status);
	}

    onCancel(): void {
        this.ref.close(false);
    }

    onConfirm(){
        this.ref.close(this.currentStatus.value);
    }
}
