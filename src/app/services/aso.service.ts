import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam } from '../models/exam.model';
import { Aso, AsoRequest } from '../models/aso.model';

@Injectable({
	providedIn: 'root'
})
export class AsoService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient,
	) { }

	createAso(aso: AsoRequest){
		return this.http.post(`${this.baseUrl}/aso`, aso);
	}

	getAso(id: number){
		return this.http.get<Aso>(`${this.baseUrl}/aso/${id}`);
	}

	updateAso(aso: AsoRequest){
		return this.http.put(`${this.baseUrl}/aso/${aso.idASO}`, aso);
	}

	deleteAso(id: number){
		return this.http.delete(`${this.baseUrl}/aso/${id}`);
	}

    getAsosByUser(idPessoa: number){
        return this.http.get<Exam[]>(`${this.baseUrl}/aso/pessoa/${idPessoa}`);
    }

	getAsos(){
		return this.http.get<Aso[]>(`${this.baseUrl}/aso`);
	}
   
}
