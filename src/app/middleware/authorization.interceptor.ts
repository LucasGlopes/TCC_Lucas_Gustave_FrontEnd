import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

	constructor(
		private authService: AuthenticationService
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if(
			(request.url === '/login') ||
			(request.url === '/funcionarios' && request.method === 'POST') ||
			(request.url === '/tecnicos' && request.method === 'POST')
		){
			return next.handle(request);
		}

		const newRequest = request.clone({
			setHeaders: {
				Authorization: 'Bearer ' + this.authService.getToken()
			}
		});

		return next.handle(newRequest);
	}
}
