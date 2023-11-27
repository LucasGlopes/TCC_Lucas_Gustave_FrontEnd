import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { SelectorOption } from 'src/app/models/selector.model';
import { Perfis, Sexo, User } from 'src/app/models/user.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TechService } from 'src/app/services/tech.service';

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
        },
        {
            label: 'Outro',
            value: Sexo.outro
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
        private notification: NotificationService,
        private datePipe: DatePipe,
        private employee: EmployeeService,
        private tech: TechService
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
            telefone:['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8)]],
            dataAniversario:['', [Validators.required]],
            sexoEnum:['', [Validators.required]],
            cpf:['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required]],
            confirmaSenha: ['', [Validators.required]],
            tipoUsuario: ['', [Validators.required]],
            setor: ['', [Validators.required]],
            cargo: ['', [Validators.required]],
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
            this.employee.createEmployee(newUser) :
            this.tech.createTech(newUser)
        )
        .pipe(
            catchError((error : HttpErrorResponse) => {
                if(error.error.message.includes('CPF')){
                    this.notification.openErrorSnackBar('CPF inválido. Tente novamente.');
                } else if(error.error.message.includes('Email')){
                    this.notification.openErrorSnackBar(error.error.message);
                } else {
                    this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                }
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
