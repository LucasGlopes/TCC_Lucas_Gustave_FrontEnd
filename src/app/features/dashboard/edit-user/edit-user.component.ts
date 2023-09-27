import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Perfis, Sexo, User } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorOption } from 'src/app/models/selector.model';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { TechService } from 'src/app/services/tech.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy{
	editForm! : FormGroup;
	subscriptions: Subscription[] = []

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

	constructor(
		private user: CurrentUserService,
		private fb: FormBuilder,
        private datePipe: DatePipe,
		private employeeService: EmployeeService,
		private techService: TechService,
		private notification: NotificationService,
		private router: Router,
		private auth: AuthenticationService

	){}

	ngOnInit(): void {
		this.initForm();
		this.editForm.patchValue(this.user.getUserValues());
		this.formatDate();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	initForm(){
		const form = {
            primeiroNome:['', [Validators.required]],
            ultimoNome: ['', [Validators.required]],
            telefone:['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8)]],
            dataAniversario:['', [Validators.required]],
            sexoEnum:['', [Validators.required]],
            setor: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            email: ['', [Validators.required]],
            perfis: [[], [Validators.required]],
			id: ['', [Validators.required]],

        }

        this.editForm = this.fb.group(form);
	}

	onSubmit(){
		if (this.editForm.invalid) return;

		const editUser: User = this.editForm.value;

		editUser.dataAniversario = this.datePipe.transform(editUser.dataAniversario, 'dd/MM/yyyy')!;
		const userPerfis = editUser.perfis;
		delete editUser.perfis;

		const subscription = (
            !!userPerfis!.find(perfil => perfil === Perfis.tecnico) ? 
            this.techService.updateTech(editUser) :
            this.employeeService.updateEmployee(editUser) 
        )
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
				return EMPTY;
			})
		)
		.subscribe(() => {
			this.notification.openSuccessSnackBar('Edição salva com sucesso!');
			this.goBack();
		});

		this.subscriptions.push(subscription);

	}

	deleteAccount(){
		const subscription = this.notification.openDeleteDialog()
		.afterClosed()
		.subscribe(status => {
			if(status){
				const editUser: User = this.editForm.value;
				const subscription = (
					!!editUser.perfis!.find(perfil => perfil === Perfis.tecnico) ? 
					this.techService.deleteTech(editUser.id) :
					this.employeeService.deleteEmployee(editUser.id) 
				)
				.pipe(
					catchError(() => {
						this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
						return EMPTY;
					})
				)
				.subscribe(() => {
					this.notification.openSuccessSnackBar('Cadastro deletado com sucesso!');
					this.auth.logout();
				});
		
				this.subscriptions.push(subscription);
			}
		});

		this.subscriptions.push(subscription);

	}

	goBack(){
		this.router.navigate(['dashboard']);
	}

	formatDate(){
		const dateComponents = this.editForm.controls['dataAniversario'].value.split("/");
		const dateObject = new Date(
			parseInt(dateComponents[2], 10),
			parseInt(dateComponents[1], 10) - 1,
			parseInt(dateComponents[0], 10)
		);
		this.editForm.controls['dataAniversario'].setValue(dateObject);
	}
}
