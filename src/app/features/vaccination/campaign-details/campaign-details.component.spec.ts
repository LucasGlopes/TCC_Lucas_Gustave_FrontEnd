import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailsComponent } from './campaign-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { VaccinationService } from 'src/app/services/vaccination.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
describe('CampaignDetailsComponent', () => {
  let component: CampaignDetailsComponent;
  let fixture: ComponentFixture<CampaignDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignDetailsComponent],
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute,
          useValue: { 
            snapshot: { 
              data: of({}),
              paramMap: convertToParamMap({ id: 1 }) 
            },
            params: of({ id: 1 }) 
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
        MatNativeDateModule
      ]
    });
    fixture = TestBed.createComponent(CampaignDetailsComponent);
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

    expect(navigateSpy).toHaveBeenCalledWith(['vacinas/campanhas']);

  });

  it('should return if is invalid', () => {
    component.onSubmit();

    expect(component.campaignForm.valid).toBe(false)
  });

  it('should goBack on successful registration', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    const vaccination = TestBed.inject(VaccinationService);

    spyOn(vaccination, 'updateCampaign').and.returnValue(of(HttpResponse));

    component.campaignForm.controls['nomeCampanha'].setValue('teste');
    component.campaignForm.controls['dataCampanha'].setValue(new Date());
    component.campaignForm.controls['descricao'].setValue('teste');
    component.campaignForm.controls['nomeVacina'].setValue('teste');
    component.campaignForm.controls['idCampanha'].setValue(1);

    component.onSubmit();
    
    expect(navigateSpy).toHaveBeenCalledWith(['vacinas/campanhas']);
  });

  it('should show error', () => {
    const notification = TestBed.inject(NotificationService);
    const notificationSpy = spyOn(notification, 'openErrorSnackBar');
    
    const vaccination = TestBed.inject(VaccinationService);

    spyOn(vaccination, 'updateCampaign').and.returnValue(throwError({}));

    component.campaignForm.controls['nomeCampanha'].setValue('teste');
    component.campaignForm.controls['dataCampanha'].setValue(new Date());
    component.campaignForm.controls['descricao'].setValue('teste');
    component.campaignForm.controls['nomeVacina'].setValue('teste');
    component.campaignForm.controls['idCampanha'].setValue(1);

    component.onSubmit();
    
    expect(notificationSpy).toHaveBeenCalled();
  });
});
