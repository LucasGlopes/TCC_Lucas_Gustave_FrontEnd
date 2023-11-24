import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationListComponent } from './vaccination-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

describe('VaccinationListComponent', () => {
  let component: VaccinationListComponent;
  let fixture: ComponentFixture<VaccinationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationListComponent],
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
    fixture = TestBed.createComponent(VaccinationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
