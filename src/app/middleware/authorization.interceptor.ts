import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

	constructor(
		private authService: AuthenticationService,
		private loadingService: LoadingService
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		
		this.loadingService.show();
		
		if(
			(request.url.endsWith('/login')) ||
			(request.url.endsWith('/funcionarios') && request.method === 'POST') ||
			(request.url.endsWith('/tecnicos') && request.method === 'POST')
		){
			return next.handle(request)
			.pipe(
				finalize(() => {
					this.loadingService.hide();
				})
			);
		}


		const newRequest = request.clone({
			setHeaders: {
				Authorization: 'Bearer ' + this.authService.getToken()
			}
		});

		return next.handle(newRequest)
		.pipe(
			finalize(() => {
				this.loadingService.hide();
		   	})
		)
	}
}
