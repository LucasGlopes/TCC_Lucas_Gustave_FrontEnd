import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsoHomeComponent } from './aso-home.component';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('AsoHomeComponent', () => {
  let component: AsoHomeComponent;
  let fixture: ComponentFixture<AsoHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsoHomeComponent],
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
    fixture = TestBed.createComponent(AsoHomeComponent);
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
