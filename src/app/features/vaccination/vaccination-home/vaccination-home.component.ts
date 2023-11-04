import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/currentUser.service';

@Component({
	selector: 'app-vaccination-home',
	templateUrl: './vaccination-home.component.html',
	styleUrls: ['./vaccination-home.component.scss']
})
export class VaccinationHomeComponent implements OnInit{
	hasPermission:boolean = false;

	constructor(
		private user: CurrentUserService
	){}

	ngOnInit(): void {
		this.hasPermission = this.user.hasPermission;
	}

}

