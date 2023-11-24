import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeComponent } from './dashboard-home.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHomeComponent],
      imports: [
        RouterModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: of({}) } }
        }
      ]
    });
    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
