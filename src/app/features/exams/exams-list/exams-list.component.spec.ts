import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsListComponent } from './exams-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { Exam, ExamStatus, ExamType } from 'src/app/models/exam.model';
import { Sexo } from 'src/app/models/user.model';

describe('ExamsSchedulingComponent', () => {
  let component: ExamsListComponent;
  let fixture: ComponentFixture<ExamsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsListComponent],
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
    fixture = TestBed.createComponent(ExamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should setDatasource', () => {
    component.setDatasource([]);

    expect(component.dataSource.paginator).toEqual(component.paginator)
  });

  it('should go to new exam', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    component.newExam()

    expect(navigateSpy).toHaveBeenCalledWith(['exames/agendamentos/novo-exame']);
  });

  it('should go to edit exam', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    component.editExam(1)

    expect(navigateSpy).toHaveBeenCalledWith(['exames/agendamentos/1']);
  });


  it('should get label', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const pessoa = {
			primeiroNome: 'Teste',
			ultimoNome: 'Usuário',
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
		};

    const exam: Exam = {
      idExame: 1,
      dataExame: '20/10/1999',
      horaExame: '',
      localExame: '',
      nomeExame: '',
      pessoa: pessoa,
      statusExame: ExamStatus.cancelado,
      tipoExame: ExamType.clinico,
    }

    const result = component.getExamTypeLabel(exam)

    expect(result).toBe('Clínico');
  });
});
