import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subscription, catchError, map, take } from 'rxjs';
import { Exam, ExamStatus, ExamType } from 'src/app/models/exam.model';
import { SelectorOption } from 'src/app/models/selector.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExamService } from 'src/app/services/exam.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-exams-details',
	templateUrl: './exams-details.component.html',
	styleUrls: ['./exams-details.component.scss']
})
export class ExamsDetailsComponent implements OnInit, OnDestroy {
	examId: number | undefined;
	examForm!: FormGroup;
	users: SelectorOption[] = [];
	subscriptions: Subscription[] = [];
	filteredOptions!: Observable<string[]>;
	statusOptions: ExamStatus[] = Object.values(ExamStatus);

	examTypes: SelectorOption[] = [
		{
			label: 'Clínico',
			value: ExamType.clinico
		},
		{
			label: 'Complementar',
			value: ExamType.complementar
		}
	]

	disabled = false;
	showSpinners = true;
	showSeconds = false;
	stepHour = 1;
	stepMinute = 5;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private employee: EmployeeService,
		private notification: NotificationService,
		private datePipe: DatePipe,
		private examService: ExamService,
		private activatedRoute: ActivatedRoute
	){}

	ngOnInit(): void {
		this.getUsers();
		this.initForm();
		this.checkRoute();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	getUsers(){
		const subscription = this.employee.getUsers()
		.pipe(
			map(users => {
				return users.map(user => {
					return {
						label: `${user.primeiroNome} ${user.ultimoNome}`,
						value: user.id
					}
				})
			}),
			catchError(() => {
				this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
				return EMPTY;
			})
		)
		.subscribe((users) => {
			this.users = users;
		});

		this.subscriptions.push(subscription);
	}

	initForm(){
		const form = {
            idExame:[],
            nomeExame: ['', [Validators.required]],
            dataExame: ['', [Validators.required]],
            horaExame: ['', [Validators.required]],
            localExame: ['', [Validators.required]],
            idPessoa: ['', [Validators.required]],  
			tipoExame: ['', [Validators.required]],
            statusExame:[{value: ExamStatus.pendente, disabled: true}, [Validators.required]]
    	}

        this.examForm = this.fb.group(form);

		const subscription = this.examForm.controls['dataExame'].valueChanges.subscribe(value => {
			const dateObject: Date = value;

			const hours = String(dateObject.getHours()).padStart(2, '0');
			const minutes = String(dateObject.getMinutes()).padStart(2, '0');

			this.examForm.controls['horaExame'].setValue(`${hours}:${minutes}`)

		})

		this.subscriptions.push(subscription);

	}

	checkRoute(){
		this.activatedRoute.params.pipe(take(1)).subscribe(params => {
			this.examId = params['idExame']; 

			if(this.examId) this.loadExam();
		});

	}

	loadExam(){
		if(!this.examId) return;

		const subscription = this.examService.getExam(this.examId)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                return EMPTY;
            })
		)
		.subscribe(exam => {
			this.examForm.patchValue({
				idExame: exam.idExame,
				nomeExame: exam.nomeExame,
				localExame: exam.localExame,
				statusExame: exam.statusExame,
				idPessoa: exam.pessoa.id
			});

			this.examForm.controls['statusExame'].enable();

			this.formatDate(exam.dataExame, exam.horaExame);
		});

		this.subscriptions.push(subscription);

	}

	onSubmit(){
		if(this.examForm.invalid) return; 

		const exam: Exam = this.examForm.value;
		exam.dataExame = this.datePipe.transform(exam.dataExame, 'dd/MM/yyyy')!;

		const subscription = (
			this.examId ? 
			this.examService.updateExam(exam) :
			this.examService.createExam(exam)
		)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                return EMPTY;
            })
		)
		.subscribe(() => {
			this.notification.openSuccessSnackBar('Exame salvo com sucesso!');
			this.goBack();
		});

		this.subscriptions.push(subscription);
	}

	goBack(){
		this.router.navigate(['exames/agendamentos']);
	}

	formatDate(dateString: string, hourString: string){
		const dateComponents = dateString.split("/");
		const dateObject = new Date(
			parseInt(dateComponents[2], 10),
			parseInt(dateComponents[1], 10) - 1,
			parseInt(dateComponents[0], 10)
		);

		const hourComponents = hourString.split(":");

		dateObject.setHours(parseInt(hourComponents[0]));
		dateObject.setMinutes(parseInt(hourComponents[1]));

		this.examForm.controls['dataExame'].setValue(dateObject);
	}

}
