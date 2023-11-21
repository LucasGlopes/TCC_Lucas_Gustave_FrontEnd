import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsDetailsComponent } from './exams-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ExamService } from 'src/app/services/exam.service';
import { HttpResponse } from '@angular/common/http';
import { ExamStatus, ExamType } from 'src/app/models/exam.model';
import { NotificationService } from 'src/app/services/notification.service';

describe('ExamsDetailsComponent', () => {
  let component: ExamsDetailsComponent;
  let fixture: ComponentFixture<ExamsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsDetailsComponent],
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute,
          useValue: { 
            snapshot: { 
              data: of({}),
              paramMap: convertToParamMap({ idExame: 1 }) 
            },
            params: of({ idExame: 1 }) 
          }
        }
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMatDatetimePickerModule, 
        NgxMatNativeDateModule, 
        NgxMatTimepickerModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(ExamsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const button = fixture.debugElement.query(
      By.css('.cancel-button')
    ) 

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledWith(['exames/agendamentos']);

  });

  it('should return if is invalid', () => {
    component.onSubmit();

    expect(component.examForm.valid).toBe(false)
  });

  it('should goBack on successful registration', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const examService = TestBed.inject(ExamService);

    spyOn(examService, 'updateExam').and.returnValue(of(HttpResponse));

    component.examForm.controls['idExame'].setValue(1);
    component.examForm.controls['idPessoa'].setValue(1);
    component.examForm.controls['dataExame'].setValue(new Date());
    component.examForm.controls['horaExame'].setValue('12:30:00');
    component.examForm.controls['nomeExame'].setValue('teste');
    component.examForm.controls['localExame'].setValue('teste');
    component.examForm.controls['tipoExame'].setValue(ExamType.clinico);
    component.examForm.controls['statusExame'].setValue(ExamStatus.pendente);

    component.onSubmit();
    
    expect(navigateSpy).toHaveBeenCalledWith(['exames/agendamentos']);
  });

  it('should goBack on successful registration', () => {
    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar');
    
    const examService = TestBed.inject(ExamService);

    spyOn(examService, 'updateExam').and.returnValue(throwError({}));

    component.examForm.controls['idExame'].setValue(1);
    component.examForm.controls['idPessoa'].setValue(1);
    component.examForm.controls['dataExame'].setValue(new Date());
    component.examForm.controls['horaExame'].setValue('12:30:00');
    component.examForm.controls['nomeExame'].setValue('teste');
    component.examForm.controls['localExame'].setValue('teste');
    component.examForm.controls['tipoExame'].setValue(ExamType.clinico);
    component.examForm.controls['statusExame'].setValue(ExamStatus.pendente);

    component.onSubmit();
    
    expect(notificationSpy).toHaveBeenCalled();
  });
});
