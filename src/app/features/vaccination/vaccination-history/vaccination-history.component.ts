import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Vaccination } from 'src/app/models/vaccination.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TableService } from 'src/app/services/table.service';
import { VaccinationService } from 'src/app/services/vaccination.service';

@Component({
	selector: 'app-vaccination-history',
	templateUrl: './vaccination-history.component.html',
	styleUrls: ['./vaccination-history.component.scss']
})
export class VaccinationHistoryComponent implements OnInit, OnDestroy {
	displayedColumns: string[] = ['vacina', 'campanha', 'data', 'status'];
	subscriptions: Subscription[] = [];
	dataSource!: MatTableDataSource<Vaccination>
	@ViewChild(MatTable) table!: MatTable<any>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private vaccination: VaccinationService,
		private notification: NotificationService,
		private tableService: TableService,
		private user: CurrentUserService
	){}

	ngOnInit(): void {
		this.loadVaccinations();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadVaccinations(){
		const userId = this.user.getUserValues().id;
		
		const subscription = this.vaccination.getVaccinationsByUser(userId)
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
		this.paginator._intl.itemsPerPageLabel = "Vacinações por página";
		this.paginator._intl.getRangeLabel = this.tableService.getCustomRangeLabel.bind(this);

		this.dataSource.filterPredicate = function (record,filter) {
			const searchTerms = filter.trim().toLowerCase().split(' ');

			return searchTerms.every((term) =>
			  record.campanha.nomeCampanha.toLowerCase().includes(term) ||
			  record.campanha.dataCampanha.toLowerCase().includes(term) ||
			  record.campanha.nomeVacina.toLowerCase().includes(term) ||
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
}
