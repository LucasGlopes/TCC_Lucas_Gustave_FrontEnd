import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign, Status, Vaccination, VaccinationScheduling } from '../models/vaccination.model';

@Injectable({
	providedIn: 'root'
})
export class VaccinationService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient,
	) { }

    createCampaign(campaign: Campaign){
        return this.http.post(`${this.baseUrl}/campanhas`, campaign);
    }

	getCampaign(id: number){
		return this.http.get<Campaign>(`${this.baseUrl}/campanhas/${id}`);
	}

	getCampaigns(){
		return this.http.get<Campaign[]>(`${this.baseUrl}/campanhas`);
	}

	deleteCampaign(id: number){
		return this.http.delete(`${this.baseUrl}/campanhas/${id}`);
	}

	updateCampaign(campaign: Campaign){
		return this.http.put(`${this.baseUrl}/campanhas/${campaign.idCampanha}`, campaign);
	}

	getVaccinations(){
		return this.http.get<Vaccination[]>(`${this.baseUrl}/vacinacoes`);
	}

	getVaccinationsByUser(id: number){
		return this.http.get<Vaccination[]>(`${this.baseUrl}/vacinacoes/pessoa/${id}`);
	}

	deleteVaccination(id: number){
		return this.http.delete(`${this.baseUrl}/vacinacoes/${id}`);
	}

	createVaccination(vaccination: VaccinationScheduling){
		return this.http.post(`${this.baseUrl}/vacinacoes`, vaccination);
	}

	updateVaccination(id: number, status: Status){
		return this.http.put(`${this.baseUrl}/vacinacoes/${id}`, {
			statusVacinacao: status
		});
	}
}
