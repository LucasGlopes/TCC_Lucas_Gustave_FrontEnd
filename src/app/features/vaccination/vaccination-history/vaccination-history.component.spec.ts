import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationHistoryComponent } from './vaccination-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CurrentUser, Sexo } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';

describe('VaccinationHistoryComponent', () => {
  let component: VaccinationHistoryComponent;
  let fixture: ComponentFixture<VaccinationHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationHistoryComponent],
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
    fixture = TestBed.createComponent(VaccinationHistoryComponent);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    const pessoa: CurrentUser = {
      primeiroNome: '',
      ultimoNome: '',
      email: '',
      id: 1,
      dataAniversario: '',
      perfis: [],
      telefone: '',
      isApproved: false,
      sexoEnum: Sexo.masculino,
      cpf: '',
      setor: '',
      cargo: ''
    }
    const userService = TestBed.inject(CurrentUserService);
    
    spyOn(userService, 'getUserValues').and.returnValue(pessoa);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
