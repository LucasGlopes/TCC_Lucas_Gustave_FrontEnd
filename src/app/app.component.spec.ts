import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CurrentUserService } from './services/currentUser.service';
import { Observable } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
      CurrentUserService
    ],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set is LoggedIn', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const testObservable = new Observable();

    const userService = TestBed.inject(CurrentUserService);
    spyOnProperty(userService, 'isLoggedIn', 'get').and.returnValue(testObservable);

    fixture.detectChanges(); 

    expect(app.isLoggedIn$).toBe(testObservable);
  });

});
