import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationStatusDialogComponent } from './status-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('StatusDialogComponent', () => {
  let component: VaccinationStatusDialogComponent;
  let fixture: ComponentFixture<VaccinationStatusDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationStatusDialogComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: {
            status: 'PENDENTE',
            pessoa: {
              primeiroNome: 'John',
              ultimoNome: 'Doe'
            },
            campanha: {
              nomeCampanha: 'Campanha Teste',
              dataCampanha: '2023-12-01'
            }
          }
        },
        { 
          provide: MatDialogRef, 
          useValue: {close: jasmine.createSpy('close')}
        }
      ]
    });
    fixture = TestBed.createComponent(VaccinationStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close with false', () => {
    const spy = component.ref.close;

    const button = fixture.debugElement.query(
      By.css('.cancel-button')
    );

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(spy).toHaveBeenCalledWith(false);
  });


  it('should call close with value', () => {
    const spy = component.ref.close;

    const button = fixture.debugElement.query(
      By.css('.default-button')
    );

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(spy).toHaveBeenCalledWith(component.currentStatus.value);
  });
  
});
