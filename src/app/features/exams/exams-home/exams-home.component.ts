import { Component } from '@angular/core';
import { Perfis } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';

@Component({
	selector: 'app-exams-home',
	templateUrl: './exams-home.component.html',
	styleUrls: ['./exams-home.component.scss']
})
export class ExamsHomeComponent {
	hasPermission: boolean = false;

	constructor(
		private user: CurrentUserService
	){}

	ngOnInit(): void {
		this.hasPermission = this.user.hasPermission;
	}

}
