import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { CurrentUserService } from "../services/currentUser.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
    constructor(
        private currentUser: CurrentUserService,
        private router: Router
    ) {}
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (this.currentUser.getUserValues()) {
            return true;
        }
        return this.router.createUrlTree(['auth', 'login']);
    }
}
