import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CurrentUser } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
    user = new BehaviorSubject<any>(null);

    setUserValues(user: CurrentUser) {
        this.user.next(user);
    }

    getUserValues(): CurrentUser {
        return this.user.value;
    }

}

