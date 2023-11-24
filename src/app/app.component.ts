import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CurrentUserService } from './services/currentUser.service';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  isLoggedIn$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;

  
  constructor(
		private user: CurrentUserService,
    private loadingService: LoadingService,
    private changeDetector: ChangeDetectorRef,
	){}

  ngOnInit(): void {
    this.isLoggedIn$ = this.user.isLoggedIn;
    this.isLoading$ = this.loadingService.isLoading;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
