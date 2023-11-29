import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsHistoryComponent } from './exams-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { CurrentUser, Sexo } from 'src/app/models/user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Exam, ExamStatus, ExamType } from 'src/app/models/exam.model';

describe('ExamsHistoryComponent', () => {
  let component: ExamsHistoryComponent;
  let fixture: ComponentFixture<ExamsHistoryComponent>;
  let pessoa: CurrentUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsHistoryComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule
      ]
    });
    fixture = TestBed.createComponent(ExamsHistoryComponent);
    component = fixture.componentInstance;

    pessoa = {
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
  });
  
  it('should create', () => {

    const userService = TestBed.inject(CurrentUserService);
    
    spyOn(userService, 'getUserValues').and.returnValue(pessoa);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should compare dates', () => {

		const exam1: Exam = {
			idExame: 1,
			dataExame: '20/10/1999',
			horaExame: '',
			localExame: '',
			nomeExame: '',
			pessoa: pessoa,
			statusExame: ExamStatus.cancelado,
			tipoExame: ExamType.clinico,
		}

    const exam2: Exam = {
			idExame: 1,
			dataExame: '20/10/2009',
			horaExame: '',
			localExame: '',
			nomeExame: '',
			pessoa: pessoa,
			statusExame: ExamStatus.cancelado,
			tipoExame: ExamType.clinico,
		}
    const userService = TestBed.inject(CurrentUserService);
    
    spyOn(userService, 'getUserValues').and.returnValue(pessoa);
    
    fixture.detectChanges();

    let result = component.compareDates(exam1,exam2);
    expect(result).toBe(-1);

    exam1.dataExame = '20/10/2020';
    result = component.compareDates(exam1,exam2);
    expect(result).toBe(1);

    result = component.compareDates(exam2,exam2);
    expect(result).toBe(0);
  });

  it('should get exam type label', () => {
		const exam1: Exam = {
			idExame: 1,
			dataExame: '20/10/1999',
			horaExame: '',
			localExame: '',
			nomeExame: '',
			pessoa: pessoa,
			statusExame: ExamStatus.cancelado,
			tipoExame: ExamType.clinico,
		}

    const userService = TestBed.inject(CurrentUserService);    
    spyOn(userService, 'getUserValues').and.returnValue(pessoa);
    
    fixture.detectChanges();

    let result = component.getExamTypeLabel(exam1);
    expect(result).toBe('Clínico');
  });

  it('should setDatasource', () => {
    const userService = TestBed.inject(CurrentUserService);
    
    spyOn(userService, 'getUserValues').and.returnValue(pessoa);
    fixture.detectChanges();
    component.setDatasource([]);

    expect(component.dataSource.paginator).toEqual(component.paginator)
  });
});
