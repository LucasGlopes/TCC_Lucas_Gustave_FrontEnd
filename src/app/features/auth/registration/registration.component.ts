import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { SelectorOption } from 'src/app/models/selector.model';
import { User } from 'src/app/models/user.model';
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
            value: 'M'
        },
        {
            label: 'Feminino',
            value: 'F'
        },
        {
            label: 'Outro',
            value: 'O'
        }
    ]

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthenticationService,
        private notification: NotificationService,
    ){}

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    initForm() {
        const form = {
            firstName:['', [Validators.required]],
            lastName: ['', [Validators.required]],
            phone:['', [Validators.required]],
            dateOfBirth:['', [Validators.required]],
            sex:['', [Validators.required]],
            cpf:['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
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
        newUser.dateOfBirth = JSON.stringify(newUser.dateOfBirth).substring(1, 11);

        const subscription = this.auth.createUser(newUser)
        .pipe(
            catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro no cadastro.');
                return EMPTY;
            })
        ).subscribe(
            () => {
                this.notification.openSuccessSnackBar('Usuário cadastrado com sucesso!')
                .afterDismissed().subscribe(() =>
                    this.router.navigate(['dashboard'])
                );
            }
        );

        this.subscriptions.push(subscription);
    }

}
