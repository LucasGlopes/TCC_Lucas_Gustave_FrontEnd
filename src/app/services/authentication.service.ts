import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUser, User } from '../models/user.model';
import { Login } from '../models/login.model';
import { tap, pipe } from 'rxjs';
import { CurrentUserService } from './currentUser.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient,
		private currentUser: CurrentUserService,
		private router: Router
	) { }

	createUser(user: User){
		return this.http.post<any>(`${this.baseUrl}/registration`, user).pipe(
			tap(res => {
				this.setCurrentUser(res);
			})
		);
	}

	login(login: Login){
		return this.http.post<any>(`${this.baseUrl}/registration/login`, login).pipe(
			tap(res => {
				this.setCurrentUser(res);
			})
		);
	}

	logout(){
		this.removeToken();
		this.currentUser.setUserValues(null);
        this.router.navigate(['auth','login']);
	}

	setCurrentUser(user: any) {
		const currentUser: CurrentUser = {
			email: user.email,
			firstName: user.firstName,
			id: user.id,
			lastName: user.lastName
		};
		this.currentUser.setUserValues(currentUser);

		this.setToken('ABCDEF');
	}

	setToken(token: string){
		sessionStorage.setItem('token', token);
	}

	getToken(){
		return sessionStorage.getItem('token');
	}

	removeToken(){
		sessionStorage.removeItem('token');
	}

}
