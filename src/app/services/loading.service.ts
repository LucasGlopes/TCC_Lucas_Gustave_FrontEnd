import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
    private visibility: BehaviorSubject<boolean>;

    constructor() {
        this.visibility = new BehaviorSubject(false);
    }

    show() {
        this.visibility.next(true);
    }

    hide() {
        this.visibility.next(false);
    }

    get isLoading(){
        return this.visibility.asObservable();
    }
 
}
