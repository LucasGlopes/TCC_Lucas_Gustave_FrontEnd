import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfPageComponent } from './pdf-page.component';
import { Aso, AsoResult, AsoType } from 'src/app/models/aso.model';
import { CurrentUser, Sexo } from 'src/app/models/user.model';
import { Exam, ExamStatus, ExamType } from 'src/app/models/exam.model';

describe('PdfPageComponent', () => {
  let component: PdfPageComponent;
  let fixture: ComponentFixture<PdfPageComponent>;
	let pessoa: CurrentUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfPageComponent],
    });
    fixture = TestBed.createComponent(PdfPageComponent);
    component = fixture.componentInstance;

		pessoa = {
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
  });
	
  it('should create', () => {
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

		const aso: Aso = {
			cnpj: '',
			crmMedicoPCMSO: '',
			crmMedicoClinico: '',
			dataASO: '',
			exames: [exam],
			idASO: 1,
			pessoa: pessoa,
			nomeEmpresa: '',
			nomeMedicoClinico: '',
			nomeMedicoPCMSO: '',
			resultadoASO: AsoResult.apto,
			risco: [],
			tipoASO: AsoType.admissional,
			validade: '',
		}
		component.aso = aso;

		fixture.detectChanges();
    expect(component).toBeTruthy();
  });

	it('should create when exam is complementary', () => {
		const clinicalExam: Exam = {
			idExame: 1,
			dataExame: '20/10/1999',
			horaExame: '',
			localExame: '',
			nomeExame: '',
			pessoa: pessoa,
			statusExame: ExamStatus.cancelado,
			tipoExame: ExamType.clinico,
		};

		const complementaryExam: Exam = {
			idExame: 1,
			dataExame: '20/10/1999',
			horaExame: '',
			localExame: '',
			nomeExame: '',
			pessoa: pessoa,
			statusExame: ExamStatus.cancelado,
			tipoExame: ExamType.complementar,
		}

		const aso: Aso = {
			cnpj: '',
			crmMedicoPCMSO: '',
			crmMedicoClinico: '',
			dataASO: '',
			exames: [clinicalExam, complementaryExam],
			idASO: 1,
			pessoa: pessoa,
			nomeEmpresa: '',
			nomeMedicoClinico: '',
			nomeMedicoPCMSO: '',
			resultadoASO: AsoResult.apto,
			risco: [],
			tipoASO: AsoType.admissional,
			validade: '',
		}
		component.aso = aso;

		fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
