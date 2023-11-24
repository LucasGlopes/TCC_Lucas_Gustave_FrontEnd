import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogComponent } from './user-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { 
            provide: MatDialogRef, 
            useValue: {close: jasmine.createSpy('close')}
        }
      ]
    });
    fixture = TestBed.createComponent(UserDialogComponent);
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

  it('should call close with true', () => {
    const spy = component.ref.close;

    const button = fixture.debugElement.query(
      By.css('[data-testid="delete-button"]')
    );

    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(spy).toHaveBeenCalledWith(true);
  })

});
