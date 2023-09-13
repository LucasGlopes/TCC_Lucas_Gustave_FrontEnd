import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CurrentUser } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
    private user = new BehaviorSubject<any>(null);

    setUserValues(user: CurrentUser | null) {
        this.user.next(user);
    }

    getUserValues(): CurrentUser {
        return this.user.value;
    }

    get isLoggedIn() {
        return this.user.asObservable();
    }

}

