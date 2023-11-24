import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Aso, AsoType, AsosByType } from 'src/app/models/aso.model';
import { AsoService } from 'src/app/services/aso.service';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
	selector: 'app-aso-history',
	templateUrl: './aso-history.component.html',
	styleUrls: ['./aso-history.component.scss']
})
export class AsoHistoryComponent implements OnInit, OnDestroy{
	asos!: Aso[];
	subscriptions: Subscription[] = [];
	displayedColumns: string[] = ['data', 'resultado', 'actions'];
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild('asoPdf', { static: true, read: ViewContainerRef }) asoPdf!: ViewContainerRef;
	
	asosByType: AsosByType[] = [
		{
			title: 'Admissional',
			type: AsoType.admissional,
			asos: [],
			dataSource: undefined,
		},
		{
			title: 'Demissional',
			type: AsoType.demissional,
			asos: [],
			dataSource: undefined,
		},
		{
			title: 'Periódico',
			type: AsoType.periodico,
			asos: [],
			dataSource: undefined,
		},
		{
			title: 'Mudança de Risco',
			type: AsoType.mudanca,
			asos: [],
			dataSource: undefined,
		},
		{
			title: 'Retorno ao Trabalho',
			type: AsoType.retorno,
			asos: [],
			dataSource: undefined,
		},
	]

	constructor(
		private asoService: AsoService,
		private user: CurrentUserService,
		private notification: NotificationService,
		private pdfService: PdfService
	){}

	ngOnInit(): void {
		this.loadAsos();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadAsos(){
		const userId = this.user.getUserValues().id;

		const subscription = this.asoService.getAsosByUser(userId)
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe(asos => {
			this.asos = asos;

			this.asos.forEach(aso => {
				this.asosByType.find(item => item.type === aso.tipoASO)!.asos.push(aso)
			});

			this.asosByType.forEach(item => {
				item.dataSource = this.setDatasource(item.asos)
			})
		})

		this.subscriptions.push(subscription);
	}

	setDatasource(asos: Aso[]){
		const dataSource = new MatTableDataSource(asos);
		return dataSource;
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
