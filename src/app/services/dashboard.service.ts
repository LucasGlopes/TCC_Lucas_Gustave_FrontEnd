import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { QuantityByAptitude, QuantityBySector, QuantityBySex } from '../models/dashboard.model';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {

	private baseUrl = environment.restApiUrl;

	constructor(
		private http: HttpClient,
	) { }

	getQuantityBySex(){
		return this.http.get<QuantityBySex>(`${this.baseUrl}/relatorio/grafico-pizza/quantidade-por-sexo`)
        .pipe(
            map((res: any) => ({
                dados: res.dados,
                porcentagem: res.porcentagem
            }))
        );
	}

    getQuantityByASO(){
		return this.http.get<QuantityByAptitude>(`${this.baseUrl}/relatorio/grafico-pizza/quantidade-por-aptidao`)
        .pipe(
            map((res: any) => ({
                dados: res.dados,
                porcentagem: res.porcentagem
            }))
        );
	}

    getQuantityBySector(){
        return this.http.get<QuantityBySector[]>(`${this.baseUrl}/relatorio/grafico-pizza/quantidade-por-setor`);
    }
   
}
