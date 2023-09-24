import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser, Perfis } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit{
	user: CurrentUser;
	userName = 'Usuário';
	isAdmin = false;

	constructor(
		private currentUser: CurrentUserService,
		private router: Router,
        private auth: AuthenticationService
	){
		this.user = this.currentUser.getUserValues();
	}

	ngOnInit(): void {
		this.userName = this.user.primeiroNome;
		this.isAdmin = this.user.perfis.includes(Perfis.admin);
	}


	goToPendingUsers(){
		this.router.navigate(['dashboard/pending-users']);
	}

    logout(){
        this.auth.logout();
    }
}
