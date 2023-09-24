import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class TechService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient
	) { }

    getNonApprovedTechs(){
        return this.http.get<CurrentUser[]>(`${this.baseUrl}/tecnicos/naoAprovados`);
    }

	approveTech(id: number){
		return this.http.put(`${this.baseUrl}/tecnicos/aprovarTecnico/${id}`,{});
	}

    updateTech(tech: CurrentUser){
        return this.http.put(`${this.baseUrl}/tecnicos/${tech.id}`, tech);
    }

	deleteTech(id: number){
		return this.http.delete(`${this.baseUrl}/tecnicos/${id}`);
	}
}
