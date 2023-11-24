import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/currentUser.service';

@Component({
	selector: 'app-aso-home',
	templateUrl: './aso-home.component.html',
	styleUrls: ['./aso-home.component.scss']
})
export class AsoHomeComponent implements OnInit {
	hasPermission: boolean = false;

	constructor(
		private user: CurrentUserService
	){}

	ngOnInit(): void {
		this.hasPermission = this.user.hasPermission;
	}
}
