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


}
