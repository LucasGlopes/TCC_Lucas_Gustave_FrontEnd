import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUser, User } from '../models/user.model';
import { tap } from 'rxjs';
import { CurrentUserService } from './currentUser.service';

@Injectable({
	providedIn: 'root'
})
export class TechService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient,
		private currentUser: CurrentUserService
	) { }

	createTech(user: User){
		return this.http.post<any>(`${this.baseUrl}/tecnicos`, user);
	}

    getNonApprovedTechs(){
        return this.http.get<CurrentUser[]>(`${this.baseUrl}/tecnicos/naoAprovados`);
    }

	approveTech(id: number){
		return this.http.put(`${this.baseUrl}/tecnicos/aprovarTecnico/${id}`,{});
	}

    updateTech(tech: CurrentUser | User){
        return this.http.put<CurrentUser>(`${this.baseUrl}/tecnicos/${tech.id}`, tech).pipe(
			tap(user => {
				this.currentUser.setUserValues(user);
			})
		);
    }

	deleteTech(id: number){
		return this.http.delete(`${this.baseUrl}/tecnicos/${id}`);
	}
}
