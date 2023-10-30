import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/currentUser.service';

@Component({
	selector: 'app-aso-list',
	templateUrl: './aso-list.component.html',
	styleUrls: ['./aso-list.component.scss']
})
export class AsoListComponent implements OnInit{
	hasPermission: boolean = false

	constructor(
		private router: Router,
		private user: CurrentUserService
	){}

	ngOnInit(): void {
		this.hasPermission = this.user.hasPermission;
	}

	newAso(){
		this.router.navigate(['aso/asos/novo']);
	}

	editAso(id: number){
		this.router.navigate([`aso/asos/${id}`]);
	}
}
