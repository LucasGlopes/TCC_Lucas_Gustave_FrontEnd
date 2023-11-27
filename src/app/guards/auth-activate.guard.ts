import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { CurrentUserService } from "../services/currentUser.service";

@Injectable({
  providedIn: "root",
})
export class AuthActivateGuard implements CanActivate {
    constructor(
        private currentUser: CurrentUserService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree 
    {
        if (this.currentUser.getUserValues()) {
            return true;
        }
        return this.router.createUrlTree(['auth', 'login']);
    }

}
