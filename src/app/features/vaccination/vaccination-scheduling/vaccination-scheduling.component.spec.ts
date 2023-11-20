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

    expect(navigateSpy).toHaveBeenCalledWith(['vacinas/agendamentos']);

  });
});
