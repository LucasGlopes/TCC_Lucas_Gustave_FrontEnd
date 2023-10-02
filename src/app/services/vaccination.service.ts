import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign } from '../models/vaccination.model';

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
		return this.http.put(`${this.baseUrl}/campanhas/${campaign.id}`, campaign);
	}

}
