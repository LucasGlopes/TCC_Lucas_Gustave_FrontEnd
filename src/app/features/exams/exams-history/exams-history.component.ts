import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Subscription, catchError, map } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { ExamService } from 'src/app/services/exam.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TableService } from 'src/app/services/table.service';

@Component({
	selector: 'app-exams-history',
	templateUrl: './exams-history.component.html',
	styleUrls: ['./exams-history.component.scss']
})
export class ExamsHistoryComponent implements OnInit, OnDestroy {
	displayedColumns: string[] = ['exame', 'local', 'data-hora', 'status'];
	dataSource!: MatTableDataSource<Exam>
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	subscriptions: Subscription[] = [];

	constructor(
		private examService: ExamService,
		private user: CurrentUserService,
		private notification: NotificationService,
		private tableService: TableService
	){}

	ngOnInit(): void {
		this.loadExams();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadExams(){
		const userId = this.user.getUserValues().id;

		const subscription = this.examService.getExamsByUser(userId)
		.pipe(
			map(exams => {
				return exams.sort((e1, e2) => this.compareDates(e2,e1))
			}),
			catchError(() => {
				this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
				return EMPTY;
			})
		)
		.subscribe(exams => {
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
			  record.localExame.toLowerCase().includes(term) ||
			  record.dataExame.toLowerCase().includes(term) ||
			  record.horaExame.toLowerCase().includes(term) ||
			  record.statusExame.toLowerCase().includes(term)
			);
			
		}
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

	formatDate(dateString: string){
		const dateComponents = dateString.split("/");
		const dateObject = new Date(
			parseInt(dateComponents[2], 10),
			parseInt(dateComponents[1], 10) - 1,
			parseInt(dateComponents[0], 10)
		);
		return dateObject;
	}

	compareDates(exam1: Exam, exam2: Exam){
		const d1 = this.formatDate(exam1.dataExame);
		const d2 = this.formatDate(exam2.dataExame);

		if (d1 > d2) {
			return 1;
		}
		if (d1 < d2) {
			return -1;
		}
		return 0;
	}

}
