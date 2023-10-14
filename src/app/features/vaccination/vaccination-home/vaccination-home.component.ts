import { Component, OnInit } from '@angular/core';
import { Perfis } from 'src/app/models/user.model';
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
		this.checkPermission();
	}

	checkPermission(){
		const profiles = this.user.getUserValues().perfis;

		this.hasPermission = profiles.some(profile => 
			profile === Perfis.admin || profile === Perfis.tecnico
		);
	}
}

