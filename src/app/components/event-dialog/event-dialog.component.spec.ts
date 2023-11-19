import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDialogComponent } from './event-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EventDialogComponent', () => {
  let component: EventDialogComponent;
  let fixture: ComponentFixture<EventDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { 
          provide: MatDialogRef, 
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(EventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
