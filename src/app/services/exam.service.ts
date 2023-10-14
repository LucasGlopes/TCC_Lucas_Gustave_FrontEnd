import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam } from '../models/exam.model';

@Injectable({
	providedIn: 'root'
})
export class ExamService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient,
	) { }

	createExam(exam: Exam){
		return this.http.post(`${this.baseUrl}/exames`, exam);
	}

	getExam(id: number){
		return this.http.get<Exam>(`${this.baseUrl}/exames/${id}`);
	}

	updateExam(exam: Exam){
		return this.http.put(`${this.baseUrl}/exames/${exam.idExame}`, exam);
	}

	deleteExam(id: number){
		return this.http.delete(`${this.baseUrl}/exames/${id}`);
	}

    getExamsByUser(id: number){
        return this.http.get<Exam[]>(`${this.baseUrl}/exames/exame/${id}`);
    }

	getExams(){
		return this.http.get<Exam[]>(`${this.baseUrl}/exames`);
	}
   
}
