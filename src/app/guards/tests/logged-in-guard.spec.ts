import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { CurrentUser, Sexo } from 'src/app/models/user.model';
import { LoggedInGuard } from '../logged-in.guard';

describe('AuthActivateGuard', () => {
  let guard: LoggedInGuard;
  let currentUserService: jasmine.SpyObj<CurrentUserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    currentUserService = jasmine.createSpyObj('CurrentUserService', ['getUserValues', 'setUserValues']);
    router = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LoggedInGuard,
        { provide: CurrentUserService, useValue: currentUserService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user values exist', () => {
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
    currentUserService.getUserValues.and.returnValue(pessoa);

    const result = guard.canActivate(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['home']);
  });

  it('should create a UrlTree and return it if user values do not exist', () => {
    currentUserService.setUserValues(null)

    const result = guard.canActivate(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
    );

    expect(result).toBe(true);
  });
});
