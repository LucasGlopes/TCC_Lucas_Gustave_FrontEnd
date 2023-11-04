import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsoListComponent } from './aso-list.component';

describe('AsoListComponent', () => {
  let component: AsoListComponent;
  let fixture: ComponentFixture<AsoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsoListComponent]
    });
    fixture = TestBed.createComponent(AsoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
