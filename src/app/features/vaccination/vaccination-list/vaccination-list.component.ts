import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Vaccination } from 'src/app/models/vaccination.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TableService } from 'src/app/services/table.service';
import { VaccinationService } from 'src/app/services/vaccination.service';
import { VaccinationStatusDialogComponent } from '../status-dialog/status-dialog.component';

@Component({
	selector: 'app-vaccination-list',
	templateUrl: './vaccination-list.component.html',
	styleUrls: ['./vaccination-list.component.scss']
})
export class VaccinationListComponent implements OnInit, OnDestroy {
	displayedColumns: string[] = ['nome', 'setor', 'campanha', 'data', 'status', 'actions'];
	subscriptions: Subscription[] = [];
	dataSource!: MatTableDataSource<Vaccination>
	@ViewChild(MatTable) table!: MatTable<any>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private router: Router,
		private vaccination: VaccinationService,
		private notification: NotificationService,
		private tableService: TableService,
		private dialog: MatDialog
	){}

	ngOnInit(): void {
		this.loadVaccinations();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadVaccinations(){
		const subscription = this.vaccination.getVaccinations()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe((vaccinations) => {
			this.setDatasource(vaccinations);
		});

		this.subscriptions.push(subscription);
	}

	setDatasource(vaccinations: Vaccination[]){
		this.dataSource = new MatTableDataSource(vaccinations);
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = "Agendamentos por página";
		this.paginator._intl.getRangeLabel = this.tableService.getCustomRangeLabel.bind(this);

		this.dataSource.filterPredicate = function (record,filter) {
			const searchTerms = filter.trim().toLowerCase().split(' ');

			return searchTerms.every((term) =>
				record.campanha.nomeCampanha.toLowerCase().includes(term) ||
				record.campanha.dataCampanha.toLowerCase().includes(term) ||
				record.pessoa.primeiroNome.toLowerCase().includes(term) ||
				record.pessoa.ultimoNome.toLowerCase().includes(term) ||
				record.pessoa.setor.toLowerCase().includes(term) ||
				record.status.toLowerCase().includes(term)
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

	newScheduling(){
		this.router.navigate(['vacinas/agendamentos/nova']);
	}

	updateStatus(vaccination: Vaccination){
		const subscription = this.dialog.open(VaccinationStatusDialogComponent, {
            autoFocus: false,
            data: vaccination
		})
		.afterClosed()
		.subscribe(status => {
			if(status){
				const subscription = this.vaccination.updateVaccination(vaccination.idVacinacao, status)
				.pipe(
					catchError(() => {
						this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
						return EMPTY;
					})
				)
				.subscribe(() => {
					this.notification.openSuccessSnackBar('Status da vacinação alterado com sucesso!');
					this.loadVaccinations();
				});
		
				this.subscriptions.push(subscription);
			}
		});

		this.subscriptions.push(subscription);
	}

	deleteVaccination(id: number){
		const subscription = this.notification.openDeleteDialog('O agendamento será permanentemente deletado.')
		.afterClosed()
		.subscribe(status => {
			if(status){
				const subscription = this.vaccination.deleteVaccination(id)
				.pipe(
					catchError(() => {
						this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
						return EMPTY;
					})
				)
				.subscribe(() => {
					let indexToRemove = this.dataSource.data.findIndex(vaccination => vaccination.idVacinacao === id);
					if (indexToRemove !== -1) {
						this.removeRow(indexToRemove);
						this.notification.openSuccessSnackBar('Agendamento de vacinação deletado com sucesso!');
					}
					
				});
		
				this.subscriptions.push(subscription);
			}
		});

		this.subscriptions.push(subscription);
	}
}
