import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUser, User } from '../models/user.model';
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

	criarFuncionario(user: User){
		return this.http.post<any>(`${this.baseUrl}/funcionarios`, user);
	}

	criarTecnico(user: User){
		return this.http.post<any>(`${this.baseUrl}/tecnicos`, user);
	}

	login(login: Login){
		return this.http.post<any>(`${this.baseUrl}/login`, login, {observe: 'response'}).pipe(
			map(res => {
				var token = res?.headers?.get('Authorization')?.substring(7)!;
				const user: CurrentUser = (jwt_decode(token || ''));

				if(!user.isApproved){
					throw new Error('Seu cadastro ainda não foi analisado.');
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
