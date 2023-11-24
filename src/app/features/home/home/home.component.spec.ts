import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { DateAdapter } from 'angular-calendar';
import { CurrentUser, Sexo } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [DateAdapter],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        ComponentsModule
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const pessoa: CurrentUser = {
      primeiroNome: '',
      ultimoNome: '',
      email: '',
      id: 1,
      dataAniversario: '',
      perfis: [],
      telefone: '',
      isApproved: false,
      sexoEnum: Sexo.masculino,
      cpf: '',
      setor: '',
      cargo: ''
    }
    const userService = TestBed.inject(CurrentUserService);
    
    spyOn(userService, 'getUserValues').and.returnValue(pessoa);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should compare dates', () => {
    const date1 = new Date('2020-10-09');
    const date2 = new Date('2010-10-09');

    let result = component.compareDates(date1,date2);
    expect(result).toBe(1);

    result = component.compareDates(date2,date1);
    expect(result).toBe(-1);

    result = component.compareDates(date1,date1);
    expect(result).toBe(0);
  });

  it('should format dates', () => {
    const date1 = '10/09/2020';
    const date2 = new Date();

    date2.setMonth(8);
    date2.setFullYear(2020);
    date2.setDate(10);
    date2.setHours(0,0,0);

    let result = component.formatDate(date1);
    expect(result.toDateString()).toEqual(date2.toDateString());
  });

  it('should format date hour', () => {
    const date1 = '10/09/2020';
    const hour = '10:10:10';
    const date2 = new Date();

    date2.setMonth(8);
    date2.setFullYear(2020);
    date2.setDate(10);
    date2.setHours(10,10,10);

    let result = component.formatDateHour(date1, hour);
    expect(result.toDateString()).toEqual(date2.toDateString());
  });
});
