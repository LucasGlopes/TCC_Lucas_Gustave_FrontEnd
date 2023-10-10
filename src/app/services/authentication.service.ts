import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../models/user.model';
import { Login } from '../models/login.model';
import { map } from 'rxjs';
import { CurrentUserService } from './currentUser.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

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

	login(login: Login){
		return this.http.post<any>(`${this.baseUrl}/login`, login, {observe: 'response'}).pipe(
			map(res => {
				var token = res?.headers?.get('Authorization')?.substring(7)!;
				const user: CurrentUser = (jwt_decode(token || ''));

				if(!user.isApproved){
					throw new Error('Seu cadastro ainda está em análise.');
				}

				this.currentUser.setUserValues(user);
				this.setToken(token);

				return null;
			})
		);
	}

	logout(){
		this.removeToken();
		this.currentUser.setUserValues(null);
        this.router.navigate(['auth','login']);
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
