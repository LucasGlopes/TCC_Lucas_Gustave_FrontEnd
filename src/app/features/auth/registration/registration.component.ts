import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectorOption } from 'src/app/models/selector.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    hidePassword: boolean = true;
    registrationForm: FormGroup = this.initForm();

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
        
    }

    initForm() {
        const form = {
            name:['', [Validators.required]],
            lastName: ['', [Validators.required]],
            phone:['', [Validators.required]],
            dateBirth:['', [Validators.required]],
            sex:['', [Validators.required]],
            cpf:['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
        }

        return this.fb.group(form);
    }

    changePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    cancel() {
        this.router.navigate(['auth','login']);
    }

    onSubmit(){
        const newUser: User = {
            cpf: this.registrationForm.controls['cpf'].value,
            dateOfBirth: JSON.stringify(this.registrationForm.controls['dateBirth'].value).substring(1, 11),
            email: this.registrationForm.controls['email'].value,
            firstName: this.registrationForm.controls['name'].value,
            lastName: this.registrationForm.controls['lastName'].value,
            password: this.registrationForm.controls['password'].value,
            sex: this.registrationForm.controls['sex'].value,
            phone: this.registrationForm.controls['phone'].value,
        }

        this.auth.createUser(newUser).subscribe({
            next: (res) => {
                this.notification.openSuccessSnackBar('Usuário cadastrado com sucesso!')
                .afterDismissed().subscribe(() =>
                    this.router.navigate(['dashboard'])
                );
            },
            error: (erro) => {
                this.notification.openErrorSnackBar('Ocorreu um erro no cadastro.');
            }
        })

    }

}
