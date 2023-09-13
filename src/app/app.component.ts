import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './services/currentUser.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  
  constructor(
		private user: CurrentUserService,
	){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.user.isLoggedIn;
  }

}
