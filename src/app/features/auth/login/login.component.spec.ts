import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of, throwError } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule, 
        MatSnackBarModule, 
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createAccount()', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const button = fixture.debugElement.query(
      By.css('.create-button')
    ) 

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledWith(['auth', 'cadastro']);

  });

  it('should change password visibility', () => {
    expect(component.hidePassword).toBe(true);

    const button = fixture.debugElement.query(
      By.css('[data-testid="password-visibility"]')
    );

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(component.hidePassword).toBe(false);
  });

  it('should navigate to home on successful login', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const authService = TestBed.inject(AuthenticationService);
    spyOn(authService, 'login').and.returnValue(of(null));

    component.loginForm.controls['email'].setValue('teste@email.com');
    component.loginForm.controls['senha'].setValue('12345');

    expect(component.loginForm.valid).toBe(true)
    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });

  it('should return if is invalid', () => {
    component.onSubmit();

    expect(component.loginForm.valid).toBe(false)
  });

  it('should show error', () => {
    const authService = TestBed.inject(AuthenticationService);
    spyOn(authService, 'login').and.returnValue(throwError({}));

    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar')

    component.loginForm.controls['email'].setValue('teste@email.com');
    component.loginForm.controls['senha'].setValue('12345');

    component.onSubmit();

    expect(notificationSpy).toHaveBeenCalledWith('Seu cadastro ainda está em análise.')

  });
  
});
