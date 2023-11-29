import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingUsersComponent } from './pending-users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

describe('PendingUsersComponent', () => {
  let component: PendingUsersComponent;
  let fixture: ComponentFixture<PendingUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingUsersComponent],
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
    fixture = TestBed.createComponent(PendingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setDatasource', () => {
    component.setDatasource();

    expect(component.dataSource.paginator).toEqual(component.paginator)
  });
});
