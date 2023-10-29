import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsoHomeComponent } from './aso-home.component';

describe('AsoHomeComponent', () => {
  let component: AsoHomeComponent;
  let fixture: ComponentFixture<AsoHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsoHomeComponent]
    });
    fixture = TestBed.createComponent(AsoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
