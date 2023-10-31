import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Aso } from 'src/app/models/aso.model';
import { Exam, ExamType } from 'src/app/models/exam.model';
import { AsoService } from 'src/app/services/aso.service';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PdfService } from 'src/app/services/pdf.service';
import { TableService } from 'src/app/services/table.service';

@Component({
	selector: 'app-aso-list',
	templateUrl: './aso-list.component.html',
	styleUrls: ['./aso-list.component.scss']
})
export class AsoListComponent implements OnInit, OnDestroy{
	hasPermission: boolean = false;
	subscriptions: Subscription[] = [];
	asos!: Aso[];
	dataSource!: MatTableDataSource<Aso>;
	displayedColumns: string[] = ['nome', 'cargo', 'tipoAso',  'data', 'resultado', 'actions'];
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild('asoPdf', { static: true, read: ViewContainerRef }) asoPdf!: ViewContainerRef;


	constructor(
		private router: Router,
		private user: CurrentUserService,
		private asoService: AsoService,
		private pdfService: PdfService,
		private notification: NotificationService,
		private tableService: TableService
	){}

	ngOnInit(): void {
		this.hasPermission = this.user.hasPermission;
		this.loadAsos();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadAsos(){
		const subscription = this.asoService.getAsos()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe(asos => {
			this.asos = asos;
			this.setDatasource(asos);
		});

		this.subscriptions.push(subscription);
	}

	setDatasource(asos: Aso[]){
		this.dataSource = new MatTableDataSource(asos);
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = "Atestados por página";
		this.paginator._intl.getRangeLabel = this.tableService.getCustomRangeLabel.bind(this);

		this.dataSource.filterPredicate = function (record,filter) {
			const searchTerms = filter.trim().toLowerCase().split(' ');

			return searchTerms.every((term) =>
				record.tipoASO.toLowerCase().includes(term) ||
				record.pessoa.primeiroNome.toLowerCase().includes(term) ||
				record.pessoa.ultimoNome.toLowerCase().includes(term) ||
				record.pessoa.cargo.toLowerCase().includes(term) ||
				record.resultadoASO.toLowerCase().includes(term) ||
				record.exames.find(exam => exam.tipoExame === ExamType.clinico)!.dataExame.toLowerCase().includes(term) 
			);
		}
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	newAso(){
		this.router.navigate(['aso/asos/novo']);
	}

	editAso(id: number){
		this.router.navigate([`aso/asos/${id}`]);
	}

	deleteAso(id: number){
		const subscription = this.notification.openDeleteDialog('O ASO será permanentemente deletado.')
		.afterClosed()
		.subscribe(status => {
			if(status){
				const subscription = this.asoService.deleteAso(id)
				.pipe(
					catchError(() => {
						this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
						return EMPTY;
					})
				)
				.subscribe(() => {
					let indexToRemove = this.dataSource.data.findIndex(aso => aso.idASO === id);
					if (indexToRemove !== -1) {
						this.removeRow(indexToRemove);
						this.notification.openSuccessSnackBar('ASO deletado com sucesso!');
					}
					
				});
		
				this.subscriptions.push(subscription);
			}
		});

		this.subscriptions.push(subscription);
	}

	removeRow(indexToRemove: number){
		const data = this.dataSource.data;
		data.splice(indexToRemove,1);
		this.dataSource.data = data;
	}

	findClinicalExam(exams: Exam[]){
		return exams.find(exam => exam.tipoExame === ExamType.clinico)!;
	}

	openPdf(idASO: number){
		const aso = this.asos.find(aso => aso.idASO === idASO);
		if (aso) {
			this.pdfService.createPDF(this.asoPdf, aso, 'newWindow')
		} else {
			this.notification.openErrorSnackBar("Não foi possível abrir o ASO.");
		}
	}

	downloadPdf(idASO: number){
		const aso = this.asos.find(aso => aso.idASO === idASO);
		if (aso) {
			this.pdfService.createPDF(this.asoPdf, aso, 'download')
		} else {
			this.notification.openErrorSnackBar("Não foi possível fazer o download do ASO.");
		}
	}

	
}
