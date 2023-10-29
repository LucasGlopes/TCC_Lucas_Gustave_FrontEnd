import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { Perfis } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { ExamService } from 'src/app/services/exam.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TableService } from 'src/app/services/table.service';

@Component({
	selector: 'app-exams-scheduling',
	templateUrl: './exams-list.component.html',
	styleUrls: ['./exams-list.component.scss']
})
export class ExamsListComponent implements OnInit, OnDestroy {
	hasPermission: boolean = false;
	dataSource!: MatTableDataSource<Exam>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	displayedColumns: string[] = ['nome', 'setor', 'exame', 'data-hora', 'status', 'actions'];
	subscriptions: Subscription[] = []

	constructor(
		private user: CurrentUserService,
		private router: Router,
		private examService: ExamService,
		private notification: NotificationService,
		private tableService: TableService
	){}

	ngOnInit(): void {
		this.hasPermission = this.user.hasPermission;
		this.loadExams();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadExams(){
		const subscription = this.examService.getExams()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe((exams) => {
			this.setDatasource(exams);
		});

		this.subscriptions.push(subscription);
	}

	setDatasource(exams: Exam[]){
		this.dataSource = new MatTableDataSource(exams);
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = "Exames por página";
		this.paginator._intl.getRangeLabel = this.tableService.getCustomRangeLabel.bind(this);

		this.dataSource.filterPredicate = function (record,filter) {
			const searchTerms = filter.trim().toLowerCase().split(' ');

			return searchTerms.every((term) =>
				record.nomeExame.toLowerCase().includes(term) ||
				record.dataExame.toLowerCase().includes(term) ||
				record.horaExame.toLowerCase().includes(term) ||
				record.pessoa.primeiroNome.toLowerCase().includes(term) ||
				record.pessoa.ultimoNome.toLowerCase().includes(term) ||
				record.pessoa.setor.toLowerCase().includes(term) ||
				record.statusExame.toLowerCase().includes(term)
			);
		}
	}

	newExam(){
		this.router.navigate(['exames/agendamentos/novo-exame']);
	}

	editExam(id: number){
		this.router.navigate([`exames/agendamentos/${id}`]);
	}

	deleteExam(id: number){
		const subscription = this.notification.openDeleteDialog('O exame será permanentemente deletado.')
		.afterClosed()
		.subscribe(status => {
			if(status){
				const subscription = this.examService.deleteExam(id)
				.pipe(
					catchError(() => {
						this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
						return EMPTY;
					})
				)
				.subscribe(() => {
					let indexToRemove = this.dataSource.data.findIndex(exam => exam.idExame === id);
					if (indexToRemove !== -1) {
						this.removeRow(indexToRemove);
						this.notification.openSuccessSnackBar('Exame deletado com sucesso!');
					}
					
				});
		
				this.subscriptions.push(subscription);
			}
		});

		this.subscriptions.push(subscription);
	}


	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	removeRow(indexToRemove: number){
		const data = this.dataSource.data;
		data.splice(indexToRemove,1);
		this.dataSource.data = data;
	}
}
