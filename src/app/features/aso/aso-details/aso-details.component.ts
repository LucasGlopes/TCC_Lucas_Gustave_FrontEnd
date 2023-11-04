import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription, catchError, map, take } from 'rxjs';
import { AsoRequest, AsoResult, AsoType } from 'src/app/models/aso.model';
import { ExamType } from 'src/app/models/exam.model';
import { SelectorOption } from 'src/app/models/selector.model';
import { AsoService } from 'src/app/services/aso.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExamService } from 'src/app/services/exam.service';
import { NotificationService } from 'src/app/services/notification.service';
import { risks } from 'src/assets/risks';

@Component({
	selector: 'app-aso-details',
	templateUrl: './aso-details.component.html',
	styleUrls: ['./aso-details.component.scss']
})
export class AsoDetailsComponent implements OnInit, OnDestroy{
	asoId: number | undefined;
	asoForm!: FormGroup;
	subscriptions: Subscription[] = [];
	users: SelectorOption[] = [];
	clinicalExams: SelectorOption[] = [];
	complementaryExams: SelectorOption[] = [];
	statusOptions: AsoResult[] = Object.values(AsoResult);
	riskOptions: string[] = risks;


	asoTypes: SelectorOption[] = [
		{
			label: 'Admissional',
			value: AsoType.admissional
		},
		{
			label: 'Demissional',
			value: AsoType.demissional
		},
		{
			label: 'Periódico',
			value: AsoType.periodico
		},
		{
			label: 'Mudança de risco',
			value: AsoType.mudanca
		},
		{
			label: 'Retorno ao trabalho',
			value: AsoType.retorno
		}
	]

	constructor(
		private fb: FormBuilder,
		private employee: EmployeeService,
		private notification: NotificationService,
		private router: Router,
		private examService: ExamService,
		private datePipe: DatePipe,
		private asoService: AsoService,
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
				const userOptions = users.map(user => {
					return {
						label: `${user.primeiroNome} ${user.ultimoNome}`,
						value: user.id
					}
				});

				return userOptions.sort((a,b) =>
					a.label < b.label ? -1 : 1
				)
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
			idPessoa: ['', Validators.required],
			exameClinico: [{value: '', disabled: true}, Validators.required],
			examesComplementares: this.fb.array([]),
			cnpj: ['', [Validators.required, Validators.pattern(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/)]],
			crmMedicoPCMSO: ['', [Validators.required, Validators.pattern(/^\d{6}\/[A-Z]{2}$/)]],
			crmMedicoClinico: ['', [Validators.required, Validators.pattern(/^\d{6}\/[A-Z]{2}$/)]],
			nomeEmpresa: ['', Validators.required],
			nomeMedicoClinico: ['', Validators.required],
			nomeMedicoPCMSO: ['', Validators.required],
			resultadoASO: ['', Validators.required],
			risco: this.fb.array([]),
			tipoASO: ['', Validators.required],
			validade: ['', Validators.required],
			dataASO: ['', Validators.required],
			idASO: ['']
		}

		this.asoForm = this.fb.group(form);

		this.onEmployeeChange();
		this.onClinicalExamChange();
	}

	checkRoute(){
		this.activatedRoute.params.pipe(take(1)).subscribe(params => {
			this.asoId = params['idAso']; 

			if(this.asoId) this.loadAso();
		});

	}

	loadAso(){
		if(!this.asoId) return;

		const subscription = this.asoService.getAso(this.asoId)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                return EMPTY;
            })
		)
		.subscribe(aso => {
			this.asoForm.patchValue({
				idPessoa: aso.pessoa.id,
				cnpj: aso.cnpj,
				crmMedicoPCMSO: aso.crmMedicoPCMSO,
				crmMedicoClinico: aso.crmMedicoClinico,
				nomeEmpresa: aso.nomeEmpresa,
				nomeMedicoClinico: aso.nomeMedicoClinico,
				nomeMedicoPCMSO: aso.nomeMedicoPCMSO,
				resultadoASO: aso.resultadoASO,
				tipoASO: aso.tipoASO,
				idASO: aso.idASO,
				dataASO: aso.dataASO
			});
			this.formatDate(aso.validade);

			aso.risco.forEach((risk) => {
				this.risksArray.push(new FormControl(risk))
			});

			aso.exames.forEach(exam => {
				if(exam.tipoExame === ExamType.clinico){
					this.asoForm.controls['exameClinico'].setValue(exam.idExame)
				} else {
					this.examsArray.push(new FormControl(exam.idExame))
				}
			});

			this.asoForm.controls['idPessoa'].disable();
		});

		this.subscriptions.push(subscription);

	}

	get examsArray(){
		return this.asoForm.controls['examesComplementares'] as FormArray;
	}

	addExam(){
		this.examsArray.push(new FormControl())
	}

	removeExam(index: number){
		this.examsArray.removeAt(index);
	}

	isExamChosen(id: number){
		return this.examsArray.value.includes(id);
	}

	get risksArray(){
		return this.asoForm.controls['risco'] as FormArray;
	}

	addRisk(){
		this.risksArray.push(new FormControl())
	}

	removeRisk(index: number){
		this.risksArray.removeAt(index);
	}

	isRiskChosen(risk: string){
		return this.risksArray.value.includes(risk);
	}

	onEmployeeChange(){
		const subscription = this.asoForm.controls['idPessoa'].valueChanges
		.subscribe(res => 
			this.getExams(res)
		);

		this.subscriptions.push(subscription);
	}

	getExams(userId: number){
		const subscription = this.examService.getExamsByUser(userId)
		.pipe(
			map(exams => {
				return exams.map(exam => {
					return {
						label: `${exam.nomeExame}, ${exam.dataExame}`,
						value: exam.idExame,
						type: exam.tipoExame,
						additionalInfo: exam.dataExame
					}
				});
			}),
			catchError(() => {
				this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
				return EMPTY;
			})
		)
		.subscribe(exams => {
			this.clinicalExams = [];
			this.complementaryExams = [];

			exams.forEach(exam => {
				if(exam.type === ExamType.clinico){
					this.clinicalExams.push(exam)
				} else {
					this.complementaryExams.push(exam)
				}
			});

			if(this.clinicalExams.length > 0){
				this.asoForm.controls['exameClinico'].enable();
			} else {
				this.notification.openErrorSnackBar('O funcionário não possui exames clínicos cadastrados.');
			}

		});

		this.subscriptions.push(subscription);
	}

	onClinicalExamChange(){
		const subscription = this.asoForm.controls['exameClinico'].valueChanges
		.subscribe((examId) => {
			const clinicalExam = this.clinicalExams.find(
				clinical => clinical.value === examId);
			if(clinicalExam){
				const asoDate = clinicalExam.additionalInfo;
				this.asoForm.controls['dataASO'].setValue(asoDate);
			}
		});

		this.subscriptions.push(subscription);
	}

	onSubmit(){
		if(this.asoForm.invalid) return;

		this.removeEmptyExams();
		this.removeEmptyRisks();

		this.asoForm.controls['idPessoa'].enable();

		const aso: AsoRequest = this.asoForm.value;
        aso.validade = this.datePipe.transform(aso.validade, 'dd/MM/yyyy')!;
		aso.exames = this.concatenateExams();
		delete aso.exameClinico;
		delete aso.examesComplementares;

		this.asoForm.controls['idPessoa'].disable();

		this.asoId ? this.updateAso(aso) : this.createAso(aso);
	}

	createAso(aso: AsoRequest){
		const subscription = this.asoService.createAso(aso)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                return EMPTY;
            })
		)
		.subscribe(() => {
			this.notification.openSuccessSnackBar('ASO registrado com sucesso!');
			this.goBack();
		});

		this.subscriptions.push(subscription);
	}

	updateAso(aso: AsoRequest){
		const subscription = this.asoService.updateAso(aso)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                return EMPTY;
            })
		)
		.subscribe(() => {
			this.notification.openSuccessSnackBar('ASO atualizado com sucesso!');
			this.goBack();
		});

		this.subscriptions.push(subscription);
	}
	
	removeEmptyExams(){
		for (let i = this.examsArray.length - 1; i >= 0; i--) {
			if(this.examsArray.at(i).value === null) this.removeExam(i)
		}
	}

	removeEmptyRisks(){
		for (let i = this.risksArray.length - 1; i >= 0; i--) {
			if(this.risksArray.at(i).value === null) this.removeRisk(i)
		}
	}

	concatenateExams(){
		return this.asoForm.controls['examesComplementares'].value
			.concat(this.asoForm.controls['exameClinico'].value)
	}

	formatDate(date: string){
		const dateComponents = date.split("/");
		const dateObject = new Date(
			parseInt(dateComponents[2], 10),
			parseInt(dateComponents[1], 10) - 1,
			parseInt(dateComponents[0], 10)
		);
		this.asoForm.controls['validade'].setValue(dateObject);
	}

	goBack(){
		this.router.navigate(['aso/asos']);
	}
}
