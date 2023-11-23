import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationSchedulingComponent } from './vaccination-scheduling.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { VaccinationService } from 'src/app/services/vaccination.service';
import { of, throwError } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Status } from 'src/app/models/vaccination.model';
import { HttpResponse } from '@angular/common/http';

describe('VaccinationSchedulingComponent', () => {
  let component: VaccinationSchedulingComponent;
  let fixture: ComponentFixture<VaccinationSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationSchedulingComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule
      ]
    });
    fixture = TestBed.createComponent(VaccinationSchedulingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('.cancel-button')
    ) 

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledWith(['vacinas/agendamentos']);

  });

  it('should show error at getCampaigns', () => {
    const vaccination = TestBed.inject(VaccinationService);
    spyOn(vaccination, 'getCampaigns').and.returnValue(throwError({}));

    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar')

    fixture.detectChanges();

    expect(notificationSpy).toHaveBeenCalled();

  });

  it('should show error', () => {
    const employee = TestBed.inject(EmployeeService);
    spyOn(employee, 'getUsers').and.returnValue(throwError({}));

    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar')

    fixture.detectChanges();
    
    expect(notificationSpy).toHaveBeenCalled();

  });

  it('should return if is invalid', () => {
    fixture.detectChanges();

    component.onSubmit();

    expect(component.schedulingForm.valid).toBe(false)
  });

  it('should go back on successful registration', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const vaccination = TestBed.inject(VaccinationService);
    spyOn(vaccination, 'createVaccination').and.returnValue(of(HttpResponse));

    fixture.detectChanges();

    component.schedulingForm.controls['idCampanha'].setValue(1);
    component.schedulingForm.controls['idFuncionarios'].setValue([1,2]);
    component.schedulingForm.controls['status'].setValue(Status.pendente);

    component.onSubmit();

    expect(component.schedulingForm.valid).toBe(true)

    expect(navigateSpy).toHaveBeenCalledWith(['vacinas/agendamentos']);
  });

  it('should show error', () => {
    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar');

    const vaccination = TestBed.inject(VaccinationService);
    spyOn(vaccination, 'createVaccination').and.returnValue(throwError({}));

    fixture.detectChanges();

    component.schedulingForm.controls['idCampanha'].setValue(1);
    component.schedulingForm.controls['idFuncionarios'].setValue([1,2]);
    component.schedulingForm.controls['status'].setValue(Status.pendente);

    component.onSubmit();

    expect(component.schedulingForm.valid).toBe(true)

    expect(notificationSpy).toHaveBeenCalled()
  });
});
