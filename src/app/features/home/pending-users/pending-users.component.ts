import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EMPTY, Subscription, catchError, switchMap } from 'rxjs';
import { CurrentUser, Perfis } from 'src/app/models/user.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TableService } from 'src/app/services/table.service';
import { TechService } from 'src/app/services/tech.service';

@Component({
	selector: 'app-pending-users',
	templateUrl: './pending-users.component.html',
	styleUrls: ['./pending-users.component.scss']
})
export class PendingUsersComponent implements OnInit, OnDestroy{
  	users: CurrentUser[] = [];
	displayedColumns: string[] = ['nome', 'email', 'dataAniversario', 'actions'];
	subscriptions: Subscription[] = [];
	dataSource!: MatTableDataSource<CurrentUser>
	@ViewChild(MatTable) table!: MatTable<any>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private employeeService: EmployeeService,
		private techService: TechService,
        private notification: NotificationService,
		private tableService: TableService
	){}


	ngOnInit(): void {
		this.loadUsers();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadUsers(){
		const subscription = this.employeeService.getNonApprovedEmployees()
		.pipe(
			switchMap(res => {
				this.users = res;
				return this.techService.getNonApprovedTechs();
			})
		).subscribe(res => {
			this.users = this.users.concat(res);
			this.setDatasource();
		});

		this.subscriptions.push(subscription);
	}

	setDatasource(){
		this.dataSource = new MatTableDataSource(this.users);
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = "Usuários por página";
		this.paginator._intl.getRangeLabel = this.tableService.getCustomRangeLabel.bind(this);
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	approveEmployee(id: number){
		const employee = this.users.find(user => user.id === id)!;

		const subscription = (
            !!employee.perfis.find(perfil => perfil === Perfis.tecnico) ? 
            this.techService.approveTech(id) :
            this.employeeService.approveEmployee(id) 
        )
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
				return EMPTY;
			})
		)
		.subscribe(() => {
			let indexToRemove = this.users.findIndex(user => user.id === id);
			if (indexToRemove !== -1) {
				this.removeRow(indexToRemove);
				this.notification.openSuccessSnackBar('Solicitação de cadastro aprovada!');
			}
		});

		this.subscriptions.push(subscription);
		
	}

	removeEmployee(id: number){
		const user = this.users.find(user => user.id === id)!;

		const subscription = (
            !!user.perfis.find(perfil => perfil === Perfis.tecnico) ? 
            this.techService.deleteTech(id) :
            this.employeeService.deleteEmployee(id) 
        )
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
				return EMPTY;
			})
		)
		.subscribe(() => {
			let indexToRemove = this.users.findIndex(user => user.id === id);
			if (indexToRemove !== -1) {
				this.removeRow(indexToRemove);
				this.notification.openSuccessSnackBar('Solicitação de cadastro recusada!');
			}
		});

		this.subscriptions.push(subscription);
		
	}

	removeRow(indexToRemove: number){
		const data = this.dataSource.data;
		data.splice(indexToRemove,1);
		this.dataSource.data = data;
	}

}

