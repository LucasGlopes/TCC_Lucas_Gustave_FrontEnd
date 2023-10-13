import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign, Status, Vaccination } from '../models/vaccination.model';
import { Exam } from '../models/exam.model';

@Injectable({
	providedIn: 'root'
})
export class ExamService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient,
	) { }

    getExamsByUser(id: number){
        return this.http.get<Exam[]>(`${this.baseUrl}/exames/exame/${id}`);
    }

   
}
