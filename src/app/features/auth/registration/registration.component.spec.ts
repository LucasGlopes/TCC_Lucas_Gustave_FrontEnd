import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { throwError } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      providers: [DatePipe],
      imports: [
        HttpClientTestingModule, 
        MatSnackBarModule, 
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule
      ],
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cancel()', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const button = fixture.debugElement.query(
      By.css('.left-button')
    ) 

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledWith(['auth', 'login']);

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

  it('should return if is invalid', () => {
    component.onSubmit();

    expect(component.registrationForm.valid).toBe(false)
  });

  it('should handle cpf validation error', fakeAsync(() => {
    const errorResponse = {
      error: {
        message: 'CPF'
      }
    };

    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar');

    const employee = TestBed.inject(EmployeeService);
    const employeeSpy = spyOn(employee, 'createEmployee').and.returnValue(throwError(errorResponse));

    const form = {
      "primeiroNome": "Teste",
      "ultimoNome": "teste",
      "telefone": "12345678",
      "dataAniversario": "1996-01-08T02:00:00.000Z",
      "sexoEnum": "MASCULINO",
      "cpf": "398.766.690-01",
      "email": "teste@email.com",
      "senha": "teste",
      "confirmaSenha": "teste",
      "tipoUsuario": "FUNCIONARIO",
      "setor": "Teste",
      "cargo": "teste"
    }

    component.registrationForm.patchValue(form)

    component.onSubmit();
    expect(component.registrationForm.valid).toBe(true)
    tick();


    // Check if the error message is displayed
    expect(notificationSpy).toHaveBeenCalledWith('CPF inválido. Tente novamente.');
  }));


  it('should handle email validation error', fakeAsync(() => {
    const errorResponse = {
      error: {
        message: 'Email'
      }
    };

    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar');

    const employee = TestBed.inject(EmployeeService);
    const employeeSpy = spyOn(employee, 'createEmployee').and.returnValue(throwError(errorResponse));

    const form = {
      "primeiroNome": "Teste",
      "ultimoNome": "teste",
      "telefone": "12345678",
      "dataAniversario": "1996-01-08T02:00:00.000Z",
      "sexoEnum": "MASCULINO",
      "cpf": "398.766.690-01",
      "email": "teste@email.com",
      "senha": "teste",
      "confirmaSenha": "teste",
      "tipoUsuario": "FUNCIONARIO",
      "setor": "Teste",
      "cargo": "teste"
    }

    component.registrationForm.patchValue(form)

    component.onSubmit();
    expect(component.registrationForm.valid).toBe(true)
    tick();


    // Check if the error message is displayed
    expect(notificationSpy).toHaveBeenCalledWith('Email');
  }));

  it('should handle other validation error', fakeAsync(() => {
    const errorResponse = {
      error: {
        message: 'something else'
      }
    };

    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar');

    const employee = TestBed.inject(EmployeeService);
    const employeeSpy = spyOn(employee, 'createEmployee').and.returnValue(throwError(errorResponse));

    const form = {
      "primeiroNome": "Teste",
      "ultimoNome": "teste",
      "telefone": "12345678",
      "dataAniversario": "1996-01-08T02:00:00.000Z",
      "sexoEnum": "MASCULINO",
      "cpf": "398.766.690-01",
      "email": "teste@email.com",
      "senha": "teste",
      "confirmaSenha": "teste",
      "tipoUsuario": "FUNCIONARIO",
      "setor": "Teste",
      "cargo": "teste"
    }

    component.registrationForm.patchValue(form)

    component.onSubmit();
    expect(component.registrationForm.valid).toBe(true)
    tick();


    // Check if the error message is displayed
    expect(notificationSpy).toHaveBeenCalledWith('Ocorreu um erro. Tente novamente mais tarde.');
  }));

});
