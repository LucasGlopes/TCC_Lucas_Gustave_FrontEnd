import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsoHistoryComponent } from './aso-history.component';
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
import { MatExpansionModule } from '@angular/material/expansion';


describe('AsoHistoryComponent', () => {
  let component: AsoHistoryComponent;
  let fixture: ComponentFixture<AsoHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsoHistoryComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatExpansionModule
      ]
    });
    fixture = TestBed.createComponent(AsoHistoryComponent);
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
