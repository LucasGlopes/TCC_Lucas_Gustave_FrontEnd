import { ComponentFixture, TestBed } from '@angular/core/testing';

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
import { of } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';

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
});
