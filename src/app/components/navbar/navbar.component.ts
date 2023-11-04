import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CurrentUser } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CurrentUserService } from 'src/app/services/currentUser.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy{
	user: CurrentUser;
	userName = 'Usuário';
	hasPermission: boolean = false;
	isHome: boolean = true;
	subscription: Subscription | undefined;

	constructor(
		private currentUser: CurrentUserService,
		private router: Router,
        private auth: AuthenticationService,
	){
		this.user = this.currentUser.getUserValues();
	}

	ngOnInit(): void {
		this.userName = this.user.primeiroNome[0].toUpperCase() + this.user.primeiroNome.slice(1).toLowerCase();
		this.hasPermission = this.currentUser.hasPermission;
		this.checkRoute();
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	checkRoute(){
		this.subscription = this.router.events.pipe(
			filter((event) => event instanceof NavigationStart)
		).subscribe((event: any) => {
			if(event.url.startsWith('/home')){
				this.isHome = true
			} else {
				this.isHome = false;
			}
		})
	}

	goTo(route: string){
		this.router.navigate([route]);
	}

    logout(){
        this.auth.logout();
    }
}
