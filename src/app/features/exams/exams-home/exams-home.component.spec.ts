import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsHomeComponent } from './exams-home.component';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('ExamsHomeComponent', () => {
  let component: ExamsHomeComponent;
  let fixture: ComponentFixture<ExamsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsHomeComponent],
      imports: [
        RouterModule
      ],
      providers: [
        CurrentUserService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: of({}) } }
        }
      ]
    });
    fixture = TestBed.createComponent(ExamsHomeComponent);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set hasPermission to true if user has permission', () => {
    const userService = TestBed.inject(CurrentUserService);
    spyOnProperty(userService, 'hasPermission', 'get').and.returnValue(true);

    fixture.detectChanges(); 

    expect(component.hasPermission).toBe(true);
  });

  it('should set hasPermission to false if user does not have permission', () => {
    const userService = TestBed.inject(CurrentUserService);
    spyOnProperty(userService, 'hasPermission', 'get').and.returnValue(false);

    fixture.detectChanges();

    expect(component.hasPermission).toBe(false);
  });
});
