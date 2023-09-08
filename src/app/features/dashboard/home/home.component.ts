import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
	user: CurrentUser;
	userName = 'Usuário';

	constructor(
		private currentUser: CurrentUserService,
		private notification: NotificationService
	){
		this.user = this.currentUser.getUserValues();
	}

	ngOnInit(): void {
		this.userName = this.user.firstName;
		this.notification.openDialog(this.userName);
	}
}
