import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EMPTY, Subscription, catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
    hidePassword: boolean = true;
    loginForm!: FormGroup;
    subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthenticationService,
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
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required]]
        }

        this.loginForm =  this.fb.group(form);
    }

    changePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        const userlogin: Login = this.loginForm.value

        const subscription = this.authService.login(userlogin)
        .pipe(
            catchError((error: Error | HttpErrorResponse) => {
                let message: string;
                if (error instanceof HttpErrorResponse) {
                    message = 'E-mail e/ou senha inválidos.';
                } else {
                    message = 'Seu cadastro ainda está em análise.';
                }
                this.notification.openErrorSnackBar(message);
                return EMPTY;
            })
        )
        .subscribe(() => {
            this.router.navigate(['home']);
        });

        this.subscriptions.push(subscription);
    }

    createAccount() {
        this.router.navigate(['auth','cadastro']);
    }

}
