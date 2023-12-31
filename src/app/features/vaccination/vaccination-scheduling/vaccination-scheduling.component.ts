import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription, catchError} from 'rxjs';
import { CurrentUser } from 'src/app/models/user.model';
import { Campaign, Status, VaccinationScheduling } from 'src/app/models/vaccination.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { VaccinationService } from 'src/app/services/vaccination.service';

@Component({
	selector: 'app-vaccination-scheduling',
	templateUrl: './vaccination-scheduling.component.html',
	styleUrls: ['./vaccination-scheduling.component.scss']
})
export class VaccinationSchedulingComponent implements OnInit, OnDestroy{
	schedulingForm!: FormGroup;
	subscriptions: Subscription[] = [];
	campaigns$!: Observable<Campaign[]>;
	users$!: Observable<CurrentUser[]>;

	constructor(
		private vaccination: VaccinationService,
		private fb: FormBuilder,
		private employee: EmployeeService,
		private router: Router,
		private notification: NotificationService
	) {}

	ngOnInit(): void {
		this.loadCampaigns();
		this.loadUsers();
		this.initForm();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadCampaigns(){
		this.campaigns$ = this.vaccination.getCampaigns()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		);
	}

	loadUsers(){
		this.users$ = this.employee.getUsers()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		);
	}

	initForm(){
		const form = {
            idCampanha:['', [Validators.required]],
            idFuncionarios: [[], [Validators.required]],
            status:[Status.pendente, [Validators.required]],

        }

        this.schedulingForm = this.fb.group(form);
	}


	onSubmit(){
		if(this.schedulingForm.invalid) return;

		const vaccination: VaccinationScheduling = this.schedulingForm.value;

		const subscription = this.vaccination.createVaccination(vaccination)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                return EMPTY;
            })
		)
		.subscribe(() => {
			this.notification.openSuccessSnackBar('Vacinação agendada com sucesso!');
			this.goBack();
		});

		this.subscriptions.push(subscription);
	}

	goBack(){
		this.router.navigate(['vacinas/agendamentos'])
	}

	
}
