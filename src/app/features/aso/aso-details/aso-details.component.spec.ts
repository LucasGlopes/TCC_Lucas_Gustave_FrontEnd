import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AsoDetailsComponent } from './aso-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NotificationService } from 'src/app/services/notification.service';
import { AsoService } from 'src/app/services/aso.service';

describe('AsoDetailsComponent', () => {
  let component: AsoDetailsComponent;
  let fixture: ComponentFixture<AsoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsoDetailsComponent],
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute,
          useValue: { 
            snapshot: { 
              data: of({}),
              paramMap: convertToParamMap({ idAso: 1 }) 
            },
            params: of({ idAso: 1 }) 
          }
        }
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule
      ]
    });
    fixture = TestBed.createComponent(AsoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const button = fixture.debugElement.query(
      By.css('[data-testid="cancel-button"]')
    ) 

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledWith(['aso/asos']);

  });

  it('should return if is invalid', () => {
    component.onSubmit();

    expect(component.asoForm.valid).toBe(false)
  });

  it('should add and remove exam', () => {
    component.addExam()

    expect(component.examsArray.length).toBe(1);

    expect(component.isExamChosen(0)).toBe(false);

    component.removeExam(0)

    expect(component.examsArray.length).toBe(0);
  });

  it('should add and remove risk', () => {
    component.addRisk()

    expect(component.risksArray.length).toBe(1);

    expect(component.isRiskChosen('teste')).toBe(false);

    component.removeRisk(0)

    expect(component.risksArray.length).toBe(0);
  });

  it('should handle CNPJ validation error when update', fakeAsync(() => {
    const errorResponse = {
      error: {
        errors: [
          {
            fieldName: 'cnpj'
          }
        ]
      }
    };

    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar');

    const aso = TestBed.inject(AsoService);
    const asoSpy = spyOn(aso, 'updateAso').and.returnValue(throwError(errorResponse));

    const form = {
      "idPessoa": 15,
      "exameClinico": 3,
      "examesComplementares": [
          29
      ],
      "cnpj": "52.242.948/0001-57",
      "crmMedicoPCMSO": "123456/DF",
      "crmMedicoClinico": "123321/SP",
      "nomeEmpresa": "GreenAnt",
      "nomeMedicoClinico": "Luiza Paulo",
      "nomeMedicoPCMSO": "Luiz lula",
      "resultadoASO": "APTO",
      "risco": [
          "Bacilos"
      ],
      "tipoASO": "DEMISSIONAL",
      "validade": "2025-06-03T03:00:00.000Z",
      "dataASO": "18/05/2023",
      "idASO": ""
  }

    component.asoForm.patchValue(form)

    component.onSubmit();
    expect(component.asoForm.valid).toBe(true)
    tick();


    // Check if the error message is displayed
    expect(notificationSpy).toHaveBeenCalledWith('CNPJ inválido. Tente novamente');
  }));

  it('should handle CNPJ validation error when create', fakeAsync(() => {
    const errorResponse = {
      error: {
        errors: [
          {
            fieldName: 'cnpj'
          }
        ]
      }
    };

    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar');

    const aso = TestBed.inject(AsoService);
    const asoSpy = spyOn(aso, 'createAso').and.returnValue(throwError(errorResponse));

    const form = {
      "idPessoa": 15,
      "exameClinico": 3,
      "examesComplementares": [
          29
      ],
      "cnpj": "52.242.948/0001-57",
      "crmMedicoPCMSO": "123456/DF",
      "crmMedicoClinico": "123321/SP",
      "nomeEmpresa": "GreenAnt",
      "nomeMedicoClinico": "Luiza Paulo",
      "nomeMedicoPCMSO": "Luiz lula",
      "resultadoASO": "APTO",
      "risco": [
          "Bacilos"
      ],
      "tipoASO": "DEMISSIONAL",
      "validade": "2025-06-03T03:00:00.000Z",
      "dataASO": "18/05/2023",
      "idASO": ""
  }

    component.asoForm.patchValue(form)
    component.asoId = undefined

    component.onSubmit();
    expect(component.asoForm.valid).toBe(true)
    tick();


    // Check if the error message is displayed
    expect(notificationSpy).toHaveBeenCalledWith('CNPJ inválido. Tente novamente');
  }));

});
