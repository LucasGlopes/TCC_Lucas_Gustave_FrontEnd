import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CurrentUser, Perfis } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
    private user = new BehaviorSubject<any>(null);

    constructor(
    ) {
        this.restoreSession();
    }

    restoreSession() {
        const token = sessionStorage.getItem('token');
    
        if (!token) return;
        //temporário
        const user: CurrentUser = JSON.parse(sessionStorage.getItem('user') || '');

        if(user){
            this.setUserValues(user)
        }
    
    }

    setUserValues(user: CurrentUser | null) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
    }

    getUserValues(): CurrentUser {
        return this.user.value;
    }

    get isLoggedIn() {
        return this.user.asObservable();
    }

    get hasPermission() {
        const profiles = this.getUserValues().perfis;

		return profiles.some(profile => 
			profile === Perfis.admin || profile === Perfis.tecnico
		);
    }

}

