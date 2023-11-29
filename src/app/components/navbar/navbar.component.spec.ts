import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CurrentUser, Sexo } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('NavBarComponent', () => {

	let component: NavBarComponent;
	let fixture: ComponentFixture<NavBarComponent>;

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

	it('should goTo', () => {
		fixture = TestBed.createComponent(NavBarComponent);		
		component = fixture.componentInstance;
		const navigateSpy = spyOn((<any>component).router, 'navigate');
	
		component.goTo('dashboard');
		
		expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
	});


	it('should logout', () => {
		fixture = TestBed.createComponent(NavBarComponent);		
		component = fixture.componentInstance;

		const auth = TestBed.inject(AuthenticationService);
		const authSpy = spyOn(auth, 'logout');

		component.logout();
		
		expect(authSpy).toHaveBeenCalled();
	});
});
