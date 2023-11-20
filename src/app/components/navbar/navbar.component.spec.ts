import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CurrentUser, Sexo } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';

describe('NavBarComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
			imports: [
				HttpClientTestingModule,
				MatIconModule,
				MatMenuModule
			]
    });

  });
	
  it('should create', () => {
		let component: NavBarComponent;
  	let fixture: ComponentFixture<NavBarComponent>;

		const pessoa: CurrentUser = {
			primeiroNome: 'Teste',
			ultimoNome: 'Usuário',
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

		fixture = TestBed.createComponent(NavBarComponent);		
		component = fixture.componentInstance;
		fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
