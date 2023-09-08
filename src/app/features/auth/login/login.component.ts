import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CurrentUser } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    hidePassword: boolean = true;
    loginForm: FormGroup = this.initForm();

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private notification: NotificationService,
        private currentUser: CurrentUserService,
    ){}

    ngOnInit(): void {
        
    }

    initForm() {
        const form = {
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        }

        return this.fb.group(form);
    }

    changePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    onSubmit() {
        this.authService.login(this.loginForm.value).subscribe({
            next: (res) => {
                this.router.navigate(['dashboard']);
            },
            error: (erro) => {
                this.notification.openErrorSnackBar('E-mail e/ou senha inválidos.');
            }
        }) 
    }

    createAccount() {
        this.router.navigate(['auth','registration']);
    }

}
