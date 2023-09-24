import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient
	) { }

    getNonApprovedEmployees(){
        return this.http.get<CurrentUser[]>(`${this.baseUrl}/funcionarios/naoAprovados`);
    }

	approveEmployee(id: number){
		return this.http.put(`${this.baseUrl}/funcionarios/aprovarFuncionario/${id}`,{});
	}

    updateEmployee(employee: CurrentUser){
        return this.http.put(`${this.baseUrl}/funcionarios/${employee.id}`, employee);
    }

	deleteEmployee(id: number){
		return this.http.delete(`${this.baseUrl}/funcionarios/${id}`);
	}
}
