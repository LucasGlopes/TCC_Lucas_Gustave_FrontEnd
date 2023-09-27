import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUser, User } from '../models/user.model';
import { tap } from 'rxjs';
import { CurrentUserService } from './currentUser.service';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient,
		private currentUser: CurrentUserService
	) { }

    getNonApprovedEmployees(){
        return this.http.get<CurrentUser[]>(`${this.baseUrl}/funcionarios/naoAprovados`);
    }

	approveEmployee(id: number){
		return this.http.put(`${this.baseUrl}/funcionarios/aprovarFuncionario/${id}`,{});
	}

    updateEmployee(employee: CurrentUser | User){
        return this.http.put<CurrentUser>(`${this.baseUrl}/funcionarios/${employee.id}`, employee).pipe(
			tap(user => {
				this.currentUser.setUserValues(user);
			})
		);
    }

	deleteEmployee(id: number){
		return this.http.delete(`${this.baseUrl}/funcionarios/${id}`);
	}
}
