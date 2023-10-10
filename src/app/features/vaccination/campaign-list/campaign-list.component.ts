import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Perfis } from 'src/app/models/user.model';
import { Campaign } from 'src/app/models/vaccination.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TableService } from 'src/app/services/table.service';
import { VaccinationService } from 'src/app/services/vaccination.service';

@Component({
	selector: 'app-campaign-list',
	templateUrl: './campaign-list.component.html',
	styleUrls: ['./campaign-list.component.scss'],
	animations: [
		trigger('detailExpand', [
		  state('collapsed', style({height: '0px', minHeight: '0'})),
		  state('expanded', style({height: '*'})),
		  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class CampaignListComponent implements OnInit, OnDestroy{
	displayedColumns: string[] = [];
	hasPermission: boolean = false;
	subscriptions: Subscription[] = [];
	dataSource!: MatTableDataSource<Campaign>;
	expandedElement: Campaign | null = null;
	@ViewChild(MatTable) table!: MatTable<any>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private router: Router,
		private vaccination: VaccinationService,
		private notification: NotificationService,
		private tableService: TableService,
		private user: CurrentUserService
	){}

	ngOnInit(): void {
		this.checkPermission();
		this.displayColumns();
		this.loadCampaigns();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	checkPermission(){
		const profiles = this.user.getUserValues().perfis;

		this.hasPermission = profiles.some(profile => 
			profile === Perfis.admin || profile === Perfis.tecnico
		);
	}

	displayColumns(){
		this.displayedColumns = this.hasPermission
			? ['expand', 'nome', 'vacina', 'data', 'actions']
			: ['expand', 'nome', 'vacina', 'data'];
	}

	loadCampaigns(){
		const subscription = this.vaccination.getCampaigns()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe((campaigns) => {
			this.setDatasource(campaigns);
		});

		this.subscriptions.push(subscription);
	}

	setDatasource(campaigns: Campaign[]){
		this.dataSource = new MatTableDataSource(campaigns);
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = "Campanhas por página";
		this.paginator._intl.getRangeLabel = this.tableService.getCustomRangeLabel.bind(this);
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

	newCampaign(){
		this.router.navigate(['vacinas/campanhas/nova']);
	}

	editCampaign(id: number){
		this.router.navigate([`vacinas/campanhas/${id}`]);
	}

	deleteCampaign(id: number){
		const subscription = this.notification.openDeleteDialog('A campanha será permanentemente deletada.')
		.afterClosed()
		.subscribe(status => {
			if(status){
				const subscription = this.vaccination.deleteCampaign(id)
				.pipe(
					catchError(() => {
						this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
						return EMPTY;
					})
				)
				.subscribe(() => {
					let indexToRemove = this.dataSource.data.findIndex(campaign => campaign.idCampanha === id);
					if (indexToRemove !== -1) {
						this.removeRow(indexToRemove);
						this.notification.openSuccessSnackBar('Campanha de vacinação deletada com sucesso!');
					}
					
				});
		
				this.subscriptions.push(subscription);
			}
		});

		this.subscriptions.push(subscription);
	}

}
