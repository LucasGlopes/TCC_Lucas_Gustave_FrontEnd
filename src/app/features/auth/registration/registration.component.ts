import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { SelectorOption } from 'src/app/models/selector.model';
import { Perfis, Sexo, User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    hidePassword: boolean = true;
    registrationForm!: FormGroup;
    subscriptions: Subscription[] = [];


    sexOptions: SelectorOption[] = [
        {
            label: 'Masculino',
            value: Sexo.masculino
        },
        {
            label: 'Feminino',
            value: Sexo.feminino
        }
    ]

    userTypes: SelectorOption[] = [
        {
            label: 'Funcionário',
            value: Perfis.funcionario
        },
        {
            label: 'Técnico',
            value: Perfis.tecnico
        }
    ]

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthenticationService,
        private notification: NotificationService,
        private datePipe: DatePipe
    ){}

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    initForm() {
        const form = {
            primeiroNome:['', [Validators.required]],
            ultimoNome: ['', [Validators.required]],
            telefone:['', [Validators.required]],
            dataAniversario:['', [Validators.required]],
            sexoEnum:['', [Validators.required]],
            cpf:['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required]],
            confirmaSenha: ['', [Validators.required]],
            tipoUsuario: ['', [Validators.required]],
        }

        this.registrationForm = this.fb.group(form);
    }

    changePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    cancel() {
        this.router.navigate(['auth','login']);
    }

    onSubmit(){
        if(this.registrationForm.invalid) return;

        const newUser: User = this.registrationForm.value;
        newUser.dataAniversario = this.datePipe.transform(newUser.dataAniversario, 'dd/MM/yyyy')!;
        const tipoUsuario = newUser.tipoUsuario;

        delete newUser.confirmaSenha;
        delete newUser.tipoUsuario;

        const subscription = (
            tipoUsuario === Perfis.funcionario ? 
            this.auth.criarFuncionario(newUser) :
            this.auth.criarTecnico(newUser)
        )
        .pipe(
            catchError((error : HttpErrorResponse) => {
                this.notification.openErrorSnackBar(error.error.message);
                return EMPTY;
            })
        ).subscribe(
            () => {
                this.router.navigate(['auth','login'])
                this.notification.openSuccessSnackBar('Solicitação de cadastro realizada com sucesso!');
            }
        );

        this.subscriptions.push(subscription);
    }

}
